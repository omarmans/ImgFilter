let Inputs=document.querySelectorAll('.filter')
let upload=document.getElementById('upload')
let download=document.getElementById('download')
let img=document.getElementById('img')
let reset=document.querySelector('span')
let imgBox=document.querySelector('.img-box')


onload=function(){
    imgBox.style.display='none'
    download.style.display='none'
    reset.style.display='none'
}
upload.onchange=function(){
        resetValue()
          imgBox.style.display='block'
    download.style.display='block'
    reset.style.display='block'
    let file=new FileReader()
    console.log(upload.files)
    file.readAsDataURL(upload.files[0])
    file.onload=function(){
          img.src=file.result
          //code
    }

}




function resetValue(){
      img.style.filter='none'

    Inputs.forEach(input => {
     
        input.value = input.defaultValue;
        
    });
  

  
}

Inputs.forEach((e) => {
    e.addEventListener('input', () => {
    
        let filtersbyPer = '';
        let filtersbyPX = '';
        
        let All=''
        Inputs.forEach((input) => {
    
            if (input.id === 'blur') {
                filtersbyPX += `${input.id}(${input.value}px) `;
            } else {
                filtersbyPer += `${input.id}(${input.value}%) `;
            }
        });
        All=filtersbyPer+filtersbyPX;
        console.log(All)
        img.style.filter = All
    });
});

reset.onclick=resetValue
download.onclick = function() {
    // إنشاء عنصر canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // تعيين عرض وارتفاع الـ canvas بنفس أبعاد الصورة
    canvas.width = img.width;
    canvas.height = img.height;

    // رسم الصورة على الـ canvas
    ctx.filter = img.style.filter; // تطبيق الفلاتر
    ctx.drawImage(img, 0, 0, img.width, img.height); // استخدام نفس الأبعاد الأصلية للصورة

    // توليد رابط للصورة
    let link = document.createElement('a');
    link.download = 'filtered_image.png';
    link.href = canvas.toDataURL('image/png');
//toDataURL ==>Exe of photo
    // إضافة الرابط إلى الصفحة والنقر عليه تلقائيًا
    document.body.appendChild(link);
    link.click();

    // حذف الرابط من الصفحة بعد التنزيل
    document.body.removeChild(link);
};


// ####
// Notes
// ####
//input which has type file ,js sees it like array has data
 //     || input.id === 'hue-rotate'==>it`s by deg not PX

 // every e has ==>defaultValue
 //get all def_value==>//     let valuesArray = Array.from(Inputs).map(input => input.value);

 //down.href=img.src==>porblem