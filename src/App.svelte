<script>
    import Textfield from "@smui/textfield";
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
    import Button from '@smui/button';
    import { Label } from '@smui/common';

    
    let checked = false;
    let email = "";
    let password = "";
</script>

<body>
    
    <form class="container">
        <figure class="icon">
            <img src="../public/vdnh_icon.jpg" alt="">
        </figure>
        
        <div class="auth-field">
            <Textfield variant="outlined" bind:value={email} label="E-mail"/>
        </div>
    
        <div class="auth-field">
            <Textfield variant="outlined" bind:value={password} label="Пароль"/>
        </div>
        
        <div class="forgot-password">
            <Label><a href="">Забыли пароль?</a></Label>
        </div>
    
        <div class="remember-me">
            <FormField>
                <Checkbox bind:checked />
                <span slot="label">Запомнить меня</span>
            </FormField>
        </div>
        
    
        <Button 
            variant="raised" 
            class="button-shaped-round"
            style="background: #E22C38;">
            <Label>Войти</Label>
        </Button>
    
        <div>
            <h2><span>или</span></h2>
        </div>

        
        <Button 
            variant="raised" 
            class="button-shaped-round"
            style="background: #E22C38;">
            <Label>Регистрация</Label>
        </Button>
    </form>
</body>


<style>
    * {
        margin: 0;
        padding: 0;
    }

    .container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding: 110px;
        max-width: 762px;
    }

    .icon {
        margin: 0 auto;
        max-width: 160px;
        max-height: 160px;

        margin-bottom: 62px;
    }

    .auth-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
    }

    .forgot-password {
        margin-bottom: 10px;
    }

    .remember-me {
        margin-bottom: 10px;
    }

    h2 {
        margin: 20px 0 20px; 
        text-align: center; 
        border-bottom: 1px solid #000; 
        line-height: 0.1em;

        font-weight: 400;
    } 

    h2 span { 
        background:#fff; 
        padding-top: 10px;
        padding-bottom: 10px; 
    }

</style>
