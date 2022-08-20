function validator(formSelector) {
    var formRules = {
    }

    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'vui long nhap truong nay'
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'vui long nhap email'
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `vui long nhap toi thieu ${min} ki tu`
            }
        },
        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : `vui long nhap toi thieu ${max} ki tu`
            }
        },
    }

    //lấy ra form element trong DOM theor `formSeletor` 
    var formElement = document.querySelector(formSelector);
    
    //chỉ xử lí khi có element trong DOM
    if (formElement ) {

        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var intput of inputs) {
            
            formRules[intput.name] = intput.getAttribute('rules').split('|')
            for(var rule of rules) {

                if(rule.indexOf(':')) {
                    var ruleInfo = rule.split(':')
                    rule = ruleInfo[0];


                    
                }

                if(Array.isArray(formRules[intput.name])) {
                    formRules[input.name].push(validatorRules[rule])
                } else {
                    formRules[input.name] = [validatorRules[rule]]
                }
            }
        }

    }
}
