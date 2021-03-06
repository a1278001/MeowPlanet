let map;

//使用者設置的圖標
let newMarker;

//從資料庫撈到的所有貓咪物件
let catList = [];


function removeMarker() {
    if (newMarker != null) {
        newMarker.setMap(null);
    }
}

//把地圖平移到目前位置
function currentPos() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
            }
        )
    };
}

function initMap() {

    //初始化地圖
    map = new google.maps.Map($('#map')[0], {
        center: { lat: 22.629314218928563, lng: 120.29299528465663 },
        zoom: 16,
        minZoom: 15,
        maxZoom: 17,
        disableDefaultUI: true,
        mapId: 'a5f4cec6781c8dda',
        gestureHandling: 'greedy'
    });

    //currentPos();

    //定位按鈕
    const locationButton = document.createElement("button");
    locationButton.innerHTML = '<i class="fa-solid fa-crosshairs fa-lg"></i>';
    $(locationButton).addClass('btn btn-dark btn-location');
    $(locationButton).css('border-radius', '10px');
    $(locationButton).css('border-color', 'white');
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
    $(locationButton).on('click', function () {
        currentPos();
    })


    //刊登協尋
    $('#pre-publish').on('click', function () {

        let windowContent =
            '<span class="h5 my-3">您的愛貓在這裡走失的嗎?</span>' +
            '<div class="d-flex mt-3 mb-1" style="justify-content: space-around">' +
            '<button class="btn btn-primary" onclick="confirmPos()">' +
            'Yes' +
            '</button>' +
            '<button onclick="removeMarker();" class="btn btn-danger">No</button>' +
            '</div>';

        settingMode(windowContent);
    })


    //搜尋框
    const input = document.getElementById("search-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });


    //綁定移動事件
    listener = map.addListener('idle', searchCat)
}


//設定位置模式
function settingMode(windowContent, offset) {

    google.maps.event.removeListener(listener);

    //把頁面上圖標隱藏
    setMarkerVisibility('hide');

    map.setOptions({ draggableCursor: 'url(../images/marker-cursor.png) 15 45, auto' });

    toggleMap()

    let listenerHandle = map.addListener("click", (e) => {

        removeMarker();

        newMarker = new google.maps.Marker({
            position: e.latLng,
            map,
            Draggable: true,
            icon: {
                url: "images/marker.png",
                scaledSize: new google.maps.Size(40, 57)
            }
        });


        map.setZoom(16);
        if (offset == true) {

            map.panTo({
                lat: newMarker.getPosition().lat() + 0.005,
                lng: newMarker.getPosition().lng()
            });
        }
        else {
            map.panTo(newMarker.getPosition());
        }


        const infowindow = new google.maps.InfoWindow({
            content: windowContent
        });

        infowindow.open({
            anchor: newMarker,
            map,
            shouldFocus: false,
        });
    });

    //切換刊登&取消刊登顯示
    $('#pre-publish').toggleClass('d-none');
    $('#cancel-publish').toggleClass('d-none');

    //取消刊登按鈕 綁定單次事件
    $('#cancel-publish').one('click', function () {

        map.setOptions({ draggableCursor: '' });
        google.maps.event.removeListener(listenerHandle);

        $('#cancel-publish').toggleClass('d-none');
        $('#pre-publish').toggleClass('d-none');

        toggleMap();

        removeMarker();

        //把頁面上圖標顯示回來
        setMarkerVisibility('show');

        listener = map.addListener('idle', searchCat);
    })
}





let showingWindow;

//把所有走失貓咪抓進catList
$(function () {
    $.get('Missings/GetMissing', function (data) {
        data.forEach((value) => {
            let cat = value;
            let LatLng = new google.maps.LatLng(cat.lat, cat.lng);
            let marker = new google.maps.Marker({
                position: LatLng,
                icon: {
                    url: "images/marker.png",
                    scaledSize: new google.maps.Size(33, 46)
                }
            });

            //綁定此marker點擊事件
            marker.addListener('click', function () {

                //地圖中心移動到圖標位置
                map.setZoom(16);
                map.panTo({
                    lat: this.getPosition().lat(), //+ 0.005
                    lng: this.getPosition().lng()
                })

                //發送AJAX取得資料
                $.get('Missings/GetDetail', { 'missingId': cat.missingId }, function (data) {
                    $('#detailModal').html(data);
                    $('#detailModal').modal('show');
                })

            })

            //綁定此marker hover事件
            marker.addListener('mouseover', function () {
                const id = cat.missingId;
                catList.filter(x => x.missingId == id)[0].marker.setAnimation(google.maps.Animation.BOUNCE);
                showingCatList.filter(x => x.missingId != id).forEach((cat) => {
                    cat.marker.setOptions({ 'opacity': 0.35 })
                })
            })

            marker.addListener('mouseout', function () {
                const id = cat.missingId;
                catList.filter(x => x.missingId == id)[0].marker.setAnimation(null);
                catList.forEach((cat) => {
                    cat.marker.setOptions({ 'opacity': 1 })
                })
            })

            cat.marker = marker;
            cat.missingId = cat.missingId;
            catList.push(cat);
        })
    })

        .then(function () {
            searchCat();
        })

})

let showingCatList = [];

//搜尋中心點附近貓貓
function searchCat() {

    catList.forEach((cat) => {
        let marker = cat.marker;
        let LatLng = new google.maps.LatLng(cat.lat, cat.lng);
        let center = map.getCenter();
        let distance = google.maps.geometry.spherical.computeDistanceBetween(center, LatLng);


        //距離小於1公里就加入圖標 & 顯示在左邊item列
        if (distance < 1000) {

            marker.setMap(map);

            if (!showingCatList.includes(cat)) {
                showingCatList.push(cat);
                $(`#missing-${cat.missingId}`).remove().appendTo('#div-items').delay(100).fadeIn(600);
            }
            $(`#missing-${cat.missingId}`).fadeIn(600);
        }
        else {

            marker.setMap(null);

            if (showingCatList.includes(cat)) {
                showingCatList.splice(showingCatList.indexOf(cat), 1);
                $(`#missing-${cat.missingId}`).fadeOut(600);
            }
        }
    })
}

// 顯示/隱藏圖標
function setMarkerVisibility(option) {
    for (var i = 0; i < showingCatList.length; i++) {
        if (option == 'show') {
            showingCatList[i].marker.setMap(map);
        }
        else if (option == 'hide') {
            showingCatList[i].marker.setMap(null);
        }
    }
}


//關掉前一個貓貓視窗
function removeWindow(clickedWindow) {
    if (showingWindow != null) {
        showingWindow.close();
    }
    showingWindow = clickedWindow
}


//點擊item導到該marker且打開window
function itemClicked(item) {

    let id = $(item).data('id');
    let clickedCat = catList.filter(x => x.missingId == id)[0];

    map.setZoom(16);
    map.panTo({
        lat: clickedCat.marker.getPosition().lat(),
        lng: clickedCat.marker.getPosition().lng()
    });

    //發送AJAX取得資料
    $.get('Missings/GetDetail', { 'missingId': id }, function (data) {
        $('#detailModal').html(data);
        $('#detailModal').modal('show')
    })
}

function itemActive(item) {
    let id = $(item).data('id');
    catList.filter(x => x.missingId == id)[0].marker.setAnimation(google.maps.Animation.BOUNCE);
    showingCatList.filter(x => x.missingId != id).forEach((cat) => {
        cat.marker.setOptions({ 'opacity': 0.35 })
    })
}

function itemInactive(item) {
    let id = $(item).data('id');
    catList.filter(x => x.missingId == id)[0].marker.setAnimation(null);
    catList.forEach((cat) => {
        cat.marker.setOptions({ 'opacity': 1 })
    })
}

//切換地圖區塊布局
function toggleMap() {
    $('#div-items').toggleClass('items-activate');
    $('#div-map').toggleClass('map-activate');
}

//確定貓咪在此遺失
function confirmPos() {

    $.get('Missings/GetPublish', (data) => {
        $('#publishModal').html(data);
        $('#publishModal').modal('show');

        $('#lat').val(newMarker.getPosition().lat());
        $('#lng').val(newMarker.getPosition().lng());
    })
}


//提供線索
$(document).on('click', '#provideClues', () => {

    let windowContent =
        '<form>' +
            '<span class="h5 my-3">請輸入線索詳細資訊</span>' +
            '<div class="d-flex mt-3 mb-1" style="justify-content: space-around">' +
            '<button class="btn btn-primary" onclick="">發布</button>' +
            '<button onclick="removeMarker();" class="btn btn-danger">取消</button>' +
            '</div>' +
        '</form>';

    $('#detailModal').modal('hide');

    settingMode(windowContent, true);
    $('#cancel-publish').one('click', () => {
        $('#detailModal').modal('show');
    })

})