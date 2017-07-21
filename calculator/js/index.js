(function() {
    let $display = document.querySelector("#display");
    let $numbers = document.querySelectorAll(".btn.num");
    let $compute = document.querySelectorAll(".btn.com");
    let $ac = document.querySelector(".btn.other.ac");
    let $del = document.querySelector(".btn.other.del");
    let $per = document.querySelector(".btn.other.per");
    let isClean = false;
    let isCompate = false;
    let fontSize = 50;

    $display.innerHTML = "0";

    // 计算
    let computeNumber = function(s) {
        isClean = true;
        return eval(s);
    }

    // 检测是否越界
    let checkDisplayWidth = function() {
        $display.style.fontSize = "50px";
        while ($display.offsetWidth >= 350) $display.style.fontSize = (fontSize -= 8) + 'px';

    }

    // 清除
    $ac.addEventListener("click", function() {
        $display.innerHTML = "0";
        $display.style.fontSize = "50px";
    });


    // 删除
    $del.addEventListener("click", function() {
        if (isCompate || isClean) return;
        if ($display.innerHTML == "0") return;
        $display.innerHTML = $display.innerHTML.slice(0, -1);
        if ($display.innerHTML.length == 0) $display.innerHTML = "0";

    });

    // 百分比
    $per.addEventListener("click", function() {
        if (!isNaN($display.innerHTML)) {
            $display.innerHTML = parseFloat($display.innerHTML) * 0.01;
        }
        checkDisplayWidth();
    })

    // 数字点击事件
    for (let i = 0; i < $numbers.length; i++) {
        let number = $numbers[i];
        number.addEventListener("click", function() {
            if (isClean) {
                $display.innerHTML = 0;
                isClean = false;
            }
            if (number.innerHTML == "0" && $display.innerHTML == "0") return;
            if ($display.innerHTML == "0") $display.innerHTML = "";
            $display.innerHTML += number.innerHTML;
            isCompate = false;
            checkDisplayWidth();

        })
    }

    // 计算点击事件
    for (let i = 0; i < $compute.length; i++) {
        let com = $compute[i];
        com.addEventListener("click", function() {
            if (isCompate || isClean) return;

            if (com.innerHTML == "=") {
                $display.innerHTML = computeNumber($display.innerHTML);
                isCompate = false;
            } else {
                $display.innerHTML += com.innerHTML;
                isCompate = true;
            }
            checkDisplayWidth();

        })
    }

})()