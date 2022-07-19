﻿let map;

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

        google.maps.event.removeListener(listener);

        //把頁面上圖標隱藏
        for (var i = 0; i < showingCatList.length; i++) {
            showingCatList[i].marker.setMap(null);
        }

        map.setOptions({ draggableCursor: 'url(../images/marker-cursor.png) 15 45, auto' });

        $('#div-items').addClass('items-activate');
        $('#div-map').addClass('map-activate');

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

            map.panTo(newMarker.getPosition());

            const contentString =
                '<span class="h5 my-3">您的愛貓在這裡走失的嗎?</span>' +
                '<div class="d-flex mt-3 mb-1" style="justify-content: space-around">' +
                '<button class="btn btn-primary" onclick="confirmPos()">' +
                'Yes' +
                '</button>' +
                '<button onclick="removeMarker();" class="btn btn-danger">No</button>' +
                '</div>';

            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });

            infowindow.open({
                anchor: newMarker,
                map,
                shouldFocus: false,
            });
        });



        //切換刊登&取消刊登顯示
        $(this).toggleClass('d-none');
        $('#cancel-publish').toggleClass('d-none');

        //取消刊登按鈕 綁定單次事件
        $('#cancel-publish').one('click', function () {
            map.setOptions({ draggableCursor: '' });
            google.maps.event.removeListener(listenerHandle);
            $(this).toggleClass('d-none');
            $('#pre-publish').toggleClass('d-none');

            $('#div-items').removeClass('items-activate');
            $('#div-map').removeClass('map-activate');

            removeMarker();

            //把頁面上圖標顯示回來
            for (var i = 0; i < showingCatList.length; i++) {
                showingCatList[i].marker.setMap(map);
            }

            listener = map.addListener('idle', searchCat);
        })
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
    var listener = map.addListener('idle', searchCat)
}







//把marker位置寫進資料庫



let showingWindow;

//把所有走失貓咪抓進catList
$(function () {
    $.get('Missings/GetMissing', function (data, status) {
        data.forEach((value, index) => {
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

    catList.forEach((cat, index) => {
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
}

function itemInactive(item) {
    let id = $(item).data('id');
    catList.filter(x => x.missingId == id)[0].marker.setAnimation(null);
}




function confirmPos() {

    $.get('Missings/GetPublish', (data) => {
        $('#publishModal').html(data);
        $('#publishModal').modal('show');

        $('#lat').val(newMarker.getPosition().lat());
        $('#lng').val(newMarker.getPosition().lng());
    })
}



window.initMap = initMap;

