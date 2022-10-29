<script>
    import Textfield from "../components/Textfield.svelte";
    let loginInfo;
</script>

<form>
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    <div class="input">
        <p class="label">Введите почту или номер телефона, который привязан к аккаунту</p>
        <div class="textfield">
            <Textfield type="text" labelContent={"Email или телефон"} bind:inputContent={loginInfo}/>
        </div>
    </div>

    <div class="submit">
        <button class="btn__raised btn-primary" 
        on:click={(e) => {
            e.preventDefault();
        }}>
            Сбросить пароль
        </button>
    </div>

</form>

<style>
    .input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 40px;
    }

    .textfield {
        padding-right: 25px;
    }

    .label {
        display: flex;
        align-items: center;
        text-align: center;

        font-weight: 400;
        font-size: 29px;
        line-height: 47px;

        color: #262626;
    }

    .submit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin-top: 40px;
    }
</style>