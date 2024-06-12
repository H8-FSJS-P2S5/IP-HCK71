const axios = require("axios");

async getProfile() {
    try {
        const { data } = await axios.get(this.baseUrl +"/profile", {
            headers: {
                access_token: localStorage.access_token,
            }
        })

        this.user = data
    } catch (error) {
        console.log(error);
    }
}

async paymentStatus() {
    try {
        const { data } = await axios({ 
            url: this.baseUrl + "/subscription",
            method: "patch",
            headers: {
                access_token: localStorage.access_token,
            }
        })
        this.getProfile()
    } catch (error) {
        console.log(error);
    }
}

async subscribe() {
  try {
    const { data } = await axios({
      url: this.baseUrl + "/midtrans-token",
      method: "post",
      headers: {
        access_token: localStorage.access_token,
      },
    });
const payment = this.paymentStatus

    window.snap.embed(data.token, {
      onSuccess: function (result) {
payment
      },
    });
  } catch (error) {
    console.log(error); 
  }
}


