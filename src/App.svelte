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
    <div class="conteiner">
        <figure class="icon">
            <img src="../public/vdnh_icon.jpg" alt="">
        </figure>
    
        <Textfield variant="outlined" bind:value={email} label="E-mail" />
    
        <Textfield variant="outlined" bind:value={password} label="Пароль" />
    
        <Label><a href="">Забыли пароль?</a></Label>
    
        <FormField>
            <Checkbox bind:checked />
            <span slot="label">Запомнить меня</span>
        </FormField>
    
        <Button variant="raised" class="button-shaped-round">
            <Label>Войти</Label>
        </Button>
    
        <Label>или</Label>
    
        <Button variant="raised" class="button-shaped-round">
            <Label>Регистрация</Label>
        </Button>
    </div>
</body>


<style>
    .conteiner {
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

    .auth_field {
        padding: 10px 0 10px 0;
    }
</style>
