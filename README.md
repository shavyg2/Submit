# Submit

common Js is supported as well.

This will return a JSON Object from a form
        
        window.Submit.Parse(form);


        name="person[name][first]" value="Man"

        //{person:{name:{first:"Man"}}}
        
Arrays are merged

Object and Arrays are not Merged
Which ever comes first takes over. This should not happen however if you write you HTML correctly.

      
      
      

