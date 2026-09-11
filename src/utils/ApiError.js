class ApiError extends Error{
    constructor(
        statuscode,
        message = "SomeThing went wrong", 
        errors=[],
        stack = ""
    )
    {   
        super(message)
        this.statuscode = statuscode;
        this.message = message;
        this.errors = errors;
        this.data = null;
        this.success = false;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}