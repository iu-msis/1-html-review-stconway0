const PersonApp = {
    data() {
      return {
        "person": {},
      }
    },    

    created() {
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then((parsedJson) => {
            console.log(parsedJson);
            this.person = parsedJson.results[0]
        })
        .catch( err => {
            console.error(err)
        })

    }
  }

/* Assigning random person data to a div element with id #personInfo */
Vue.createApp(PersonApp).mount("#personInfo");