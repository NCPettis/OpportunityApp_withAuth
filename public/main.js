
let trash = document.getElementsByClassName("fa fa-trash");



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.closest('tr').dataset.id;
   
        fetch(`/messages/${id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
     
        }).then(function (response) {
          window.location.reload()
        })
      });
});

document.querySelectorAll('.dropdown').forEach(select => {
  select.dataset.previous = select.value;

  select.addEventListener('change', async (e) => {
    const id = e.target.dataset.id;
    const apply = e.target.value;

    try{
      const res = await fetch (`/messages/${id}/apply`, {

          method: 'PUT',
          headers: {'Content-Type' : 'application/json' }, 
          body: JSON.stringify({ apply})
      });
      if (!res.ok) throw new Error ('try again');
      e.target.dataset.previous = apply;
    }catch (err){
      e.target.value = e.target.dataset.previous;
      alert('Save failed')
    }
  })
})