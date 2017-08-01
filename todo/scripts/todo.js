(function() {
  // js执行loop
  let runloop = {
    //  init 初始化
    init() {
      this.index = -1;
      this.lists = JSON.parse(localStorage.getItem("todo-list")) || []; //todos
      this.$app = document.querySelector(".app"); //整体
      this.$table = document.querySelector(".tableview"); //tableview
      this.$cell = document.querySelector(".cell"); //cell
      this.$edit = document.querySelector("#edit"); //编辑
      this.$save = document.querySelector("#save"); //保存
      this.$close = document.querySelector("#close"); //关闭
      this.$delete = document.querySelector(".delete"); //删除
      this.$content = document.querySelector(".content"); //内容页
      this.$note = document.querySelector(".note"); //输入的内容
      this.$app.addEventListener("click", this, false); //事件绑定
    },

    // push content
    push() {
      if (this.index != -1) {
        this.$note.value = this.lists[this.index].text;
        this.$delete.style.display = "block";
      }
      this.$content.classList.add("push");
      this.$app.style.overflow = "hidden";
    },

    // pop content
    pop() {
      this.index = -1;
      this.$delete.style.display = "none";
      this.$app.style.overflow = "visible";
      this.$content.classList.remove("push");
    },

    // 清除原输入内容
    clean() {
      this.$note.value = "";
    },

    // 保存 (修改或新增)
    save() {
      if (this.$note.value.length <= 0) return;
      if (this.index != -1) this.lists[this.index].text = this.$note.value;
      else this.lists.push({ text: this.$note.value });
      localStorage.setItem("todo-list", JSON.stringify(this.lists));
      this.display();
      this.pop();
    },

    // 删除
    delete() {
      this.lists.splice(this.index, 1);
      localStorage.setItem("todo-list", JSON.stringify(this.lists));
      this.display();
      this.pop();
    },

    // 展示TODO
    display() {
      this.$table.innerHTML = this.lists
        .map(function(note, i) {
          return `<div class='cell' data-index='${i}'>${note.text}</div>`;
        })
        .join("");
    },

    // 委托代理事件响应
    handleEvent(e) {
      let target = e.target;
      if (target.matches(".fa-edit")) {
        this.push();
        this.clean();
      } else if (target.matches(".fa-times")) {
        this.pop();
      } else if (target.matches(".fa-floppy-o")) {
        this.save();
      } else if (target.matches(".cell")) {
        this.index = event.target.dataset.index;
        this.push();
      } else if (target.matches(".delete")) {
        this.delete();
      }
    }
  };

  // DOMContentLoaded -> init
  document.addEventListener("DOMContentLoaded", function() {
    runloop.init();
    runloop.display();
  });
})();
