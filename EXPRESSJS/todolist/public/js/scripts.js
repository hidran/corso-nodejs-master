
document.addEventListener('DOMContentLoaded',()=> {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(ele =>{
        ele.style.opacity ='0';
        setTimeout(()=>{
            ele.parentNode.removeChild(ele);
        }, 5000);
    });

});
async function showConfirmMsg(title ='', msg = '', forname) {
 const resp =   await Swal.fire({
        title: title || 'Are you sure?',
        text: msg || 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
     //   confirmButtonColor: '#3085d6',
         //ancelButtonColor: '#d33',
       // confirmButtonText: 'Yes, delete it!'
    });

   if(resp.value){
       if(document.forms[forname]){
           document.forms[forname].submit();
       }
   }
}
