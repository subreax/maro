<script>
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
    import Button from '@smui/button';
    import { Label } from '@smui/common';
    import Textfield from './Textfield.svelte';

    
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
            <Textfield bind:value={email}/>
        </div>
        
        <div class="auth-field">
            <!-- <Textfield variant="outlined" bind:value={password} label="Пароль"/> -->
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
    
        <div class="title">
            <span>
                или
            </span>
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
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
        padding-right: 20px;
    }

    .forgot-password {
        margin-bottom: 10px;
    }

    .remember-me {
        margin-bottom: 10px;
        position: relative;
        left: -10px;
    }

    .title {
        overflow: hidden;
        text-align: center;
        font-size: 20px;
    }

    .title span {
    /* Стили тега обертки для заголовков 
    ** в несколько строк */
        display: inline-block;
        vertical-align: middle;
    }
    
    .title:before,
    .title:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: 1px;
        background-color: #262626;
        position: relative;
    }

    .title::before {
        margin-left: -100%;
        left: -14px;
    }

    .title::after {
        margin-right: -100%;
        right: -14px;
    }

</style>
