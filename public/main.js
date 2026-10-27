let thumbUp = document.getElementsByClassName("fa-thumbs-up");
let trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const position = this.parentNode.parentNode.childNodes[1].innerText
        const pay = this.parentNode.parentNode.childNodes[3].innerText
        const company = this.parentNode.parentNode.childNodes[5].innerText
        const link = this.parentNode.parentNode.childNodes[7].innerText
        const apply = this.parentNode.parentNode.childNodes[9].innerText
        const notes = this.parentNode.parentNode.childNodes[11].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'position': position,
            'pay': pay, 
            'company' : company,
            'link' : link,
            'apply' : apply,
            'notes' : notes

          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
