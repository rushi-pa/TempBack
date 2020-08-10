function p1(){

    return new Promise(function( resolve, reject){
    
        resolve();
    
      });
    
    }
    
     
    
    function p2 (data){
    
    return new Promise(function( resolve, reject){
    
      if (data != "")
    
        resolve();
    
      else
    
        reject();
    
      });
    
    }
    
     
    
    p1().then(p2).then(()=>{
    
      console.log("Promise chain finished");
    
    }).catch(function(rejectMsg){
        console.log(rejectMsg);
    });