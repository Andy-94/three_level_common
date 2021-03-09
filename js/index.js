let $province = $('#provinces');
let $city =$('#city');
let $county = $('#county');

$(()=>{
    $.get('http://localhost:3000/get_all_province',function(result){
        let {status,data,err} = result;
        if(status === 1){
            let html = '';
            data.forEach((item)=>{
                html += `<option value="${item.$province}">${item.name}</option>`
            })
            $province.append(html);
        }else{
            alert(err)
        }
    })
    $province.change(function(){
        let province = this.value;
        $city.html('<option value="">Please choose your city</option>');
        $county.html('<option value="">Please choose your county</option>');
        if(!province){
            return;
        }
        $.get('http://localhost:3000/get_cities_by_province',{province},function(result){
            let {status,data,err} = result;
            if(status === 1){
                let html = '';
                data.forEach((item)=>{
                    html += `<option value="${item.$city}">${item.name}</option>`
                })
                $city.append(html);
            }else{
                alert(err)
            }
        })
    })

    $city.change(function(){
        let city = this.value;
        let province =$province.val();
        $county.html('<option value="">Please choose your county</option>');
        if(!city){
            return;
        }
        $.get('http://localhost:3000/get_counties_by_province_and_city',{city,province},function(result){
            let {status,data,err}= result;
            if(status === 1){
                let html = '';
                data.forEach((item)=>{
                    html += `<option value = "${item.$county}">${item.name}</option>`;

                })
                $county.append(html);
            }else{
                alert(err)
            }
        })
    })


})
