let start = window.innerHeight * 1;
let mid = window.innerHeight * 1.4;
let mid_1 = window.innerHeight * 1.6;
let end = window.innerHeight * 2;
let mid2 = window.innerHeight * 2.4;
let mid2_2 = window.innerHeight * 2.6;
let end2 = window.innerHeight * 3;
let mid3 = window.innerHeight * 3.4;
let mid3_2 = window.innerHeight * 3.6;
let end3 = window.innerHeight * 4;
$(document).on('scroll', function () {
    let now = $(document).scrollTop();
    if (now < start) {
        $('#img4').css('opacity', '1').css('--lef', '5%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img5').css('opacity', '1').css('--lef', '35%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img6').css('opacity', '1').css('--lef', '65%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', '0')
        $('.intro-p2').css('opacity', '0')
        $('.intro-p3').css('opacity', '0')
        $('.intro-p4').css('opacity', '0')
        $('.intro-p5').css('opacity', '0')
        $('.intro-p6').css('opacity', '0')
        $('.intro-p7').css('opacity', '0')
        $('.intro-p8').css('opacity', '0')
        $('.intro-p9').css('opacity', '0')

        $('#sitterLink').css('pointer-events', 'auto')
        $('#adoptionLink').css('pointer-events', 'auto')
        $('#missingLink').css('pointer-events', 'auto')

    } else if ((now > start) && (now < mid)) {
        $('#img4')
            .css('--lef', `${5 + (20 * (now - start) / (mid - start))}%`)
            .css('--top', `${30 - (25 * (now - start) / (mid - start))}%`)
            .css('--wid', `${30 + (20 * (now - start) / (mid - start))}%`)
            .css('height', `${40 + (26 * (now - start) / (mid - start))}%`)
        $('#img5').css('opacity', `${1 - (now - start) / (mid - start)}`).css('--lef', '35%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img6').css('opacity', `${1 - (now - start) / (mid - start)}`).css('--lef', '65%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', `${(now - start) / (mid - start)}`)
        $('.intro-p2').css('opacity', `${(now - start) / (mid - start)}`)
        $('.intro-p3').css('opacity', `${(now - start) / (mid - start)}`)
        $('.intro-p4').css('opacity', '0')
        $('.intro-p5').css('opacity', '0')
        $('.intro-p6').css('opacity', '0')
        $('.intro-p7').css('opacity', '0')
        $('.intro-p8').css('opacity', '0')
        $('.intro-p9').css('opacity', '0')

        $('#sitterLink').css('pointer-events', 'auto')
        $('#adoptionLink').css('pointer-events', 'none')
        $('#missingLink').css('pointer-events', 'none')

    } else if ((now > mid) && (now < mid_1)) {
        $('#img5').css('opacity', '0')
        $('#img6').css('opacity', '0')
    } else if ((now > mid_1) && (now < end)) {
        $('#img4')
            .css('--lef', `${25 - (20 * (now - mid_1) / (end - mid_1))}%`)
            .css('--top', `${5 + (25 * (now - mid_1) / (end - mid_1))}%`)
            .css('--wid', `${50 - (20 * (now - mid_1) / (end - mid_1))}%`)
            .css('height', `${66 - (26 * (now - mid_1) / (end - mid_1))}%`)
        $('#img5').css('opacity', `${(now - mid_1) / (end - mid_1)}`).css('--lef', '35%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img6').css('opacity', `${(now - mid_1) / (end - mid_1)}`).css('--lef', '65%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', `${1 - (now - mid_1) / (end - mid_1)}`)
        $('.intro-p2').css('opacity', `${1 - (now - mid_1) / (end - mid_1)}`)
        $('.intro-p3').css('opacity', `${1 - (now - mid_1) / (end - mid_1)}`)
        $('.intro-p4').css('opacity', '0')
        $('.intro-p5').css('opacity', '0')
        $('.intro-p6').css('opacity', '0')
        $('.intro-p7').css('opacity', '0')
        $('.intro-p8').css('opacity', '0')
        $('.intro-p9').css('opacity', '0')
    } else if ((now > end) && (now < mid2)) {
        $('#img5')
            .css('--lef', `${35 - (10 * (now - end) / (mid2 - end))}%`)
            .css('--top', `${30 - (25 * (now - end) / (mid2 - end))}%`)
            .css('--wid', `${30 + (20 * (now - end) / (mid2 - end))}%`)
            .css('height', `${40 + (26 * (now - end) / (mid2 - end))}%`)
        $('#img4').css('opacity', `${1 - (now - end) / (mid2 - end)}`).css('--lef', '5%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img6').css('opacity', `${1 - (now - end) / (mid2 - end)}`).css('--lef', '65%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', '0')
        $('.intro-p2').css('opacity', '0')
        $('.intro-p3').css('opacity', '0')
        $('.intro-p4').css('opacity', `${(now - end) / (mid2 - end)}`)
        $('.intro-p5').css('opacity', `${(now - end) / (mid2 - end)}`)
        $('.intro-p6').css('opacity', `${(now - end) / (mid2 - end)}`)
        $('.intro-p7').css('opacity', '0')
        $('.intro-p8').css('opacity', '0')
        $('.intro-p9').css('opacity', '0')

        $('#sitterLink').css('pointer-events', 'none')
        $('#adoptionLink').css('pointer-events', 'auto')
        $('#missingLink').css('pointer-events', 'none')

    } else if ((now > mid2) && (now < mid2_2)) {
        $('#img4').css('opacity', '0')
        $('#img6').css('opacity', '0')
    } else if ((now > mid2_2) && (now < end2)) {
        $('#img5')
            .css('--lef', `${25 + (10 * (now - mid2_2) / (end2 - mid2_2))}%`)
            .css('--top', `${5 + (25 * (now - mid2_2) / (end2 - mid2_2))}%`)
            .css('--wid', `${50 - (20 * (now - mid2_2) / (end2 - mid2_2))}%`)
            .css('height', `${66 - (26 * (now - mid2_2) / (end2 - mid2_2))}%`)
        $('#img4').css('opacity', `${(now - mid2_2) / (end2 - mid2_2)}`).css('--lef', '5%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img6').css('opacity', `${(now - mid2_2) / (end2 - mid2_2)}`).css('--lef', '65%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', '0')
        $('.intro-p2').css('opacity', '0')
        $('.intro-p3').css('opacity', '0')
        $('.intro-p4').css('opacity', `${1 - (now - mid2_2) / (end2 - mid2_2)}`)
        $('.intro-p5').css('opacity', `${1 - (now - mid2_2) / (end2 - mid2_2)}`)
        $('.intro-p6').css('opacity', `${1 - (now - mid2_2) / (end2 - mid2_2)}`)
        $('.intro-p7').css('opacity', '0')
        $('.intro-p8').css('opacity', '0')
        $('.intro-p9').css('opacity', '0')
    } else if ((now > end2) && (now < mid3)) {
        $('#img6')
            .css('--lef', `${65 - (40 * (now - end2) / (mid3 - end2))}%`)
            .css('--top', `${30 - (25 * (now - end2) / (mid3 - end2))}%`)
            .css('--wid', `${30 + (20 * (now - end2) / (mid3 - end2))}%`)
            .css('height', `${40 + (26 * (now - end2) / (mid3 - end2))}%`)
        $('#img4').css('opacity', `${1 - (now - end2) / (mid3 - end2)}`).css('--lef', '5%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img5').css('opacity', `${1 - (now - end2) / (mid3 - end2)}`).css('--lef', '35%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', '0')
        $('.intro-p2').css('opacity', '0')
        $('.intro-p3').css('opacity', '0')
        $('.intro-p4').css('opacity', '0')
        $('.intro-p5').css('opacity', '0')
        $('.intro-p6').css('opacity', '0')
        $('.intro-p7').css('opacity', `${(now - end2) / (mid3 - end2)}`)
        $('.intro-p8').css('opacity', `${(now - end2) / (mid3 - end2)}`)
        $('.intro-p9').css('opacity', `${(now - end2) / (mid3 - end2)}`)

        $('#sitterLink').css('pointer-events', 'none')
        $('#adoptionLink').css('pointer-events', 'none')
        $('#missingLink').css('pointer-events', 'auto')

    } else if ((now > mid3) && (now < mid3_2)) {
        $('#img4').css('opacity', '0')
        $('#img5').css('opacity', '0')
    } else if ((now > mid3_2) && (now < end3)) {
        $('#img6').css('visibility', 'visible')
            .css('--lef', `${25 + (40 * (now - mid3_2) / (end3 - mid3_2))}%`)
            .css('--top', `${5 + (25 * (now - mid3_2) / (end3 - mid3_2))}%`)
            .css('--wid', `${50 - (20 * (now - mid3_2) / (end3 - mid3_2))}%`)
            .css('height', `${66 - (26 * (now - mid3_2) / (end3 - mid3_2))}%`)
        $('#img4').css('opacity', `${(now - mid3_2) / (end3 - mid3_2)}`).css('--lef', '5%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img5').css('opacity', `${(now - mid3_2) / (end3 - mid3_2)}`).css('--lef', '35%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p7').css('opacity', `${1 - (now - mid3_2) / (end3 - mid3_2)}`)
        $('.intro-p8').css('opacity', `${1 - (now - mid3_2) / (end3 - mid3_2)}`)
        $('.intro-p9').css('opacity', `${1 - (now - mid3_2) / (end3 - mid3_2)}`)
    } else if (now > end3) {
        $('#img4').css('--lef', '5%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img5').css('--lef', '35%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('#img6').css('--lef', '65%').css('--top', '30%').css('--wid', '30%').css('height', '40%')
        $('.intro-p1').css('opacity', '0')
        $('.intro-p2').css('opacity', '0')
        $('.intro-p3').css('opacity', '0')
        $('.intro-p4').css('opacity', '0')
        $('.intro-p5').css('opacity', '0')
        $('.intro-p6').css('opacity', '0')
        $('.intro-p7').css('opacity', '0')
        $('.intro-p8').css('opacity', '0')
        $('.intro-p9').css('opacity', '0')

        $('#sitterLink').css('pointer-events', 'auto')
        $('#adoptionLink').css('pointer-events', 'auto')
        $('#missingLink').css('pointer-events', 'auto')
    }

})