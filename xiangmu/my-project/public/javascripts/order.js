$(() => {
    let signIn = $("#signIn");
    let login = (name,age,skill,description,password) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/signs",
                data: {
                    name,
                    age,
                    skill,
                    description,
                    password
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let name = $("#inputEmail4").val();
        let password = $("#inputPassword4").val();
        let age = $("#inputAddress").val();
        let description = $("#inputCity").val();
        let skill = $("#inputAddress2").val();
        let data = await login(name,age,skill,description,password);
        alert("添加成功");
        $("#inputEmail4").val("");
        $("#inputPassword4").val("");
        $("#inputAddress").val("");
        $("#inputCity").val("");
        $("#inputAddress2").val("");
    })
    //失去焦点的时候发送请求，判断是否已存在用户名
    let logins = (name) => {
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
    $("#inputEmail4").blur(async () =>{
        // console.log(666);
        let name = $("#inputEmail4").val();
        let data = await logins(name);
        console.log(data);
        if(data == ""){
            console.log(666);
        }else{
            console.log(999);
            $("#inputEmail4").val("");
        }
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