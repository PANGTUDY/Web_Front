const validateFns ={
    required(key,value){
        if(!value){
            return `${key}을 입력해주세요`
        }
    }
}
const validator = {
    //error 객체와 검증자를 관리할 validates를 맵으로 초기화한다 
    init(){
        this.errors = {}
        this.validates = new Map()

        return this
    },
    // 검증자를 배열에 넣어놓기 
    setup(key,expression){
        const validates = expression.replace(/'/g,"").split("|")
        this.validates.set(key,validates)
    },
    // 검증하기 
    validate(key,value){
        const validates = this.validates.get(key)
        const errors = validates.map(v => validateFns[v](key,value)).filter(v => !!v)
        return errors
    },

}

export default validator.init()