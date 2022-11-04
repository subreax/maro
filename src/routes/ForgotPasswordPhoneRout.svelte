<script>
    import CodeInputComponent from "../components/CodeInputComponent.svelte";
    
    function onCodeEntered(code) {

    }

</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    
    <p class="label">Код отправлен по СМС</p>
    
    <CodeInputComponent className="align-center" digits={6} on:code={(e) => onCodeEntered(e.detail.code)} />
    

    <div class="btn-holder">
        <button class="btn__raised btn-primary">Сбросить пароль</button>
    </div>

</form>

<style>
    .label {
        text-align: center;
        font-size: 1.5rem;
        line-height: 1.5em;

        color: #262626;
    }

    .btn-holder {
        margin: 32px auto;
    }
</style>