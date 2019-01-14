$(() => {
    let signIn = $("#signIn");
    let logins = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        console.log(inputEmail, inputPassword);
        let data = await logins(inputEmail, inputPassword);
        console.log(data);
        console.log(data.token);
        if (data.status === 'success') {
            localStorage.setItem("token", data.token);
            location.href = "dashboard.html";
            // alert("登录");
            console.log('成功')

        } else{
            // alert("登录失败,密码或邮箱错误！");
            console.log('失败')
        }
    })
})

