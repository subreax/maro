<script>
    import PasswordField from "../components/PasswordField.svelte";
    import Checkbox from "../components/Checkbox.svelte";

    let password;
    let passwordRepeated;
    let remember;
</script>

<form>
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

        <div class="fields">
        <div class="textfields">
            <PasswordField idIcon={"icon1"} idPassword={"passwordWrite"} labelContent={"Пароль"} bind:inputContent={password}/>
            <PasswordField idIcon={"icon2"} idPassword={"passwordRepite"} labelContent={"Повторить пароль"} bind:inputContent={passwordRepeated}/>
        </div>

        <div class="additional-buttons">
            <Checkbox checkboxContent="Запомнить меня" bind:status={remember}/>
        </div> 
        <div class="submit">
            <button class="btn__raised btn-primary" 
            on:click={(e) => {
                e.preventDefault();
            }}>
                На главную
            </button>
        </div>
    </div>

</form>

<style>
    .fields {
        display: flex;
        flex-direction: column;
        justify-content: center;

        margin-top: 41px;
        gap: 30px;
    }

    .textfields {
        display: flex;
        flex-direction: column;

        gap: 35px;
    }

    .additional-buttons {
        display: flex;
        justify-content: center;
        
        padding-right: 15px;
    }

    .submit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>