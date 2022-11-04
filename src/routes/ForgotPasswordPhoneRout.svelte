<script>
    import CodeInputComponent from "../components/CodeInputComponent.svelte";
    
    export let location;
    
    function onCodeEntered(code) {
        
    }
</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    <h2 class="label">Сброс пароля</h2>
    <p class="label">Код отправлен по СМС</p>
    
    <CodeInputComponent className="align-center" digits={6} on:code={(e) => onCodeEntered(e.detail.code)} />
    
    <div class="btn-holder">
        <button class="btn__raised btn-primary">Сбросить пароль</button>
    </div>
</form>

<style>
    h2 {
        font-weight: 400;
        margin-bottom: 32px;
    }
</style>