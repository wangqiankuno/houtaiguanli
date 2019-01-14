$(() => {
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
        console.log(name);
        let data = await login(name);
        let html = data.map((item,index)=>{
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
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
            alert('救命！');
        location.href = "login.html";
        }
    })();
})