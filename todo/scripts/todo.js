let index = -1;
let lists = JSON.parse(localStorage.getItem("todo-list")) || []; //todos

//  push content
let pushList = function() {
    if (index != -1) {
        $(".note").val(lists[index].text);
        $(".delete").css("display", "block");
    }
    $(".content").addClass("push");
};
// pop content
let pop = function() {
    index = -1;
    $(".delete").css("display", "none");
    $(".content").removeClass("push");
    $(".setting").removeClass("pushSetting");
};

// 清除原输入内容
let cleanList = function() {
    $(".note").val("");
};

// 保存 (修改或新增)
var save = function() {

    if ($(".note").val().length <= 0) {
        alert("请输入内容");
        return;
    }
    if (index != -1) lists[index].text = $(".note").val();
    else lists.push({
        text: $(".note").val()
    });
    localStorage.setItem("todo-list", JSON.stringify(lists));
    display();
    pop();

};

// 删除
let deleteList = function() {
    lists.splice(index, 1);
    localStorage.setItem("todo-list", JSON.stringify(lists));
    display();
    pop();
};

// 展示TODO
let display = function() {
    let html = lists.map(function(note, i) {
        return (`<div class='cell' data-index='${i}'>${note.text}</div>`);
    }).join("");
    $("#tableview").html(html);
};

//  编辑
$(".app").on("click", ".fa-edit", function(event) {
    pushList();
    cleanList();
});

//  关闭
$(".app").on("click", ".fa-times", function(event) {
    pop();
});

//  设置
$(".app").on("click", ".fa-gear", function(event) {
    $(".setting").addClass("pushSetting");

});
//  返回
$(".app").on("click", ".nav-btn-back", function(event) {
    pop();

});

//  保存
$(".app").on("click", ".fa-floppy-o", function(event) {
    save();
});

//  修改
$(".app").on("click", ".cell", function(event) {
    index = event.target.dataset.index;
    pushList();
});

//  删除
$(".app").on("click", ".delete", function(event) {
    deleteList();
});
//  显示
$(function() {
    display();
})