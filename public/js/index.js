
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
  
      let file = document.querySelector('[type=file]').files[0];
      fr = new FileReader();
      fr.onload = () => {
        
        $.ajax({
          url: "/upload",
          type: 'POST',
          data: {food: fr.result },
          dataType: "text",
          processData: true,
          success: (data) => {
          
            $("body").html(data); 
          }
       })
      }
      fr.readAsText(file);
  }),

  $(document).on("click", "#ds" , function(e) {
    let constructedFile = {};

    $( ".top-setting" ).each(function( index ) {

      constructedFile[ $(this).find('h3').text() ] = {};
      let outer = $(this).find('h3').text();

      $(this).find('.outer-field').each( function(){
        constructedFile[ outer ][$(this).attr('id')] = $(this).val();
      })

      $(this).find( 'div' ).each( function(){
          
        let inner = $(this).find('h5').text();
        constructedFile[ outer ][ $(this).find('h5').text()] = [];
      
        $(this).find('input').each( function(){
          constructedFile[ outer ][ inner ][$(this).attr('id')] = $(this).val();
        })
         
        constructedFile[ outer ][ inner ] = Object.assign({}, constructedFile[ outer ][ inner ]);
      })
    });

    $.ajax({
      url: "/su",
      type: 'POST',
      data: {data: constructedFile, id: $("#settingcontent").attr( 'data-id') },
      processData: true,
      success: (da) => {
      
        da = da.replace(/\\/g, '');
        da = da.replace(/"/g, '');
        
        var blob = new Blob([da], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "ark.ini");
        
      }
   })
    
 
    
  })
)
