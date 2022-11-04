<script>
    import Textfield from "../components/Textfield.svelte";
    let loginInfo;
</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    
    <p class="label">Введите почту или номер телефона, который привязан к аккаунту</p>
    <div>
        <Textfield type="text" labelContent={"Email или телефон"} bind:inputContent={loginInfo}/>
    </div>


    <div class="btn-holder">
        <button class="btn__raised btn-primary" 
        on:click={(e) => {
            e.preventDefault();
        }}>
            Сбросить пароль
        </button>
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