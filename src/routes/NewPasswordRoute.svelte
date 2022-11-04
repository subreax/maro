<script>
    import PasswordField from "../components/PasswordField.svelte";

    let password;
    let passwordRepeated;
</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    
    <PasswordField idIcon={"icon1"} idPassword={"passwordWrite"} labelContent={"Пароль"} bind:inputContent={password}/>
    <PasswordField idIcon={"icon2"} idPassword={"passwordRepite"} labelContent={"Повторить пароль"} bind:inputContent={passwordRepeated}/>
    
    <div class="btn-holder">
        <button class="btn__raised btn-primary" 
        on:click={(e) => {
            e.preventDefault();
        }}>
            Сохранить
        </button>
    </div>
</form>

<style>
    .btn-holder {
        margin: 32px auto;
    }
</style>