
$(

  $(document).on("click", ".ini-select" , function() {

    $.ajax({
      url: "/settings",
      type: 'POST',
      processData: true,
      data: {id: $(this).attr( "data-id" ) },
      success: (data) => {
        
        $("body").html(data);
        
      }
   })
 
  }),

  $(document).on("click", "#view-files" , e => {

    $.ajax({
      url: "/ini_list",
      type: "GET",
      success: (data) => {
        $("body").html(data);
      }
    })
  }),

  $(document).on("submit", "#ini-form" ,e => {
    e.preventDefault();
  
      let file = document.querySelector('[type=file]').files[0], data;
      fr = new FileReader();
      fr.onload = () => {
        data = fr.result;
        
        $.ajax({
          url: "/upload",
          type: 'POST',
          data: {food: data },
          dataType: "text",
          processData: true,
          success: (data) => {
            console.log(data);
            $("body").html(data);
            
          }
       })
      }
      fr.readAsText(file); 
  })
  
)
