$(() => {
    //在进去页面之前将数据库所有的数据渲染在页面上
    let getUserList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
                data: {
                    name
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async ()=>{
        let data = await getUserList();
        let html = data.map((item,index)=>{
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                    <td><button class="shan">删除</button></td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
    })();
    //通过搜索键搜索需要删除的信息
    let signIn = $("#seach");
    let login = (name) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
                data: {
                    name
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let name = $("#seachText").val();
        let data = await login(name);
        let html = data.map((item,index)=>{
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                    <td><button class="shan">删除</button></td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
    })
    //给删除键一个点击事件，删除当前信息
    let logins = (name) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/shan",
                data: {
                    name
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    $("#list").on("click",".shan",async function(){
        let name = $(this).parent().prev().prev().prev().prev().html();
        console.log(name);
        let data = await logins(name);
        alert("删除成功");
        $(this).parent().parent().remove();
    })

//token时效
function autoLogin() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            headers: {
                token: localStorage.getItem("token")
            },
            url: "http://localhost:3000/users/autoLogin",
            success(data) {
                resolve(data)
            }
        })
    })
}
(async function () {
    let isLogin = await autoLogin();
    if(isLogin.status){
        console.log('s')
    }else{
        console.log('f') 
    location.href = "login.html";
    }
})();

})