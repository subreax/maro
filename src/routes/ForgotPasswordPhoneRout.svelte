<script>
    import Textfield from "../components/Textfield.svelte";
    let loginInfo;
</script>

<form>
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    <div class="input">
        <p class="label">Код отправлен по СМС</p>
        <div>
            <Textfield type="text" labelContent={"Код подтверждения"} bind:inputContent={loginInfo}/>
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
        align-items: center;
        gap: 20px;
    }

    .label {
        display: flex;
        justify-content: center;

        font-weight: 400;
        font-size: 1.5rem;
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