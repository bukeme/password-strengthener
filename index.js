const password = document.querySelector('.password')
const msg = document.querySelector('.msg')
const pswContainer = document.querySelector('.password-strength-container')


function characterLength(value) {
    let pwdLength = value.length
    if (pwdLength <= 5) {
        return {
            loss: 40,
            desc: 'Password is too short'
        }
    } else if (pwdLength <= 10) {
        return {
            loss: 15,
            desc: 'Password could be more'
        }
    }
}

function checkCharacters(value, regX, type) {
    let regex = value.match(regX) || []
    if (regex.length == 0) {
        return {
            loss: 20,
            desc: `There are no ${type} characters`
        }
    } else if (regex.length <= 3) {
        return {
            loss: 5,
            desc: `There could be more ${type} characters`
        }
    }
}

function checkLowerCharacters(value) {
    return checkCharacters(value, /[a-z]/g, 'lower')
}

function checkUpperCharacters(value) {
    return checkCharacters(value, /[A-Z]/g, 'upper')
}

function specialCharacters(value) {
    return checkCharacters(value, /[^a-zA-z\d\s]/g, 'special')
}

function checkRepeatedCharacters(value) {
    let regex = value.match(/(.+)\1/g) || []
    if (regex.length > 0) {
        return {
            loss: regex.length * 10,
            desc: 'There are repeated characters'
        }
    }
}

function calculateStrength(value) {
    const assessments = []
    assessments.push(characterLength(value))
    assessments.push(checkLowerCharacters(value))
    assessments.push(checkUpperCharacters(value))
    assessments.push(specialCharacters(value))
    assessments.push(checkRepeatedCharacters(value))
    return assessments
}


password.addEventListener('input', function() {
    value = this.value
    let passwordStrength = value ? 100 : 0
    msg.innerHTML = ''
    if (value) {
        const assessments = calculateStrength(value)
        assessments.forEach(function(assessment) {
            if (!assessment) return
            passwordStrength -= assessment.loss
            msg.innerHTML += `<li>${assessment.desc}</li>`
        })
    }
    pswContainer.style.setProperty('--pwd-strength', passwordStrength + '%')

})