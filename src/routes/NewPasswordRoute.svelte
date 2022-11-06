<script>
    import { isPasswordValid, parseGetParams } from "../utils";
    import PasswordField from "../components/PasswordField.svelte";
    import { Backend } from "../backend";
    import { navigate } from "svelte-routing";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"
    
    // email=dima2000947@gmail.com
    // code=Q2ZESjhIQnpucmZUUEhwTnNDT2VwWHNKYU0zcllwRzdid2VLaE9qZHBaS3ZlS2hJWldNbVlaTm9RQlhiV1NYUVNJZHdwYTdRM05pL2ZpcUx6b1A4aTVWZ3cxeCs1cEZVSG5WR04xa3lEcVVzQ0lDalBBdWVVN1lNTndGV255dytMYk55WFdGeUpoVStnUTkzWGQ4M2MzL1ZHcFp6dVM5eG03SXAzb0NBZGpuWW8vYVRKZ0lWVFJiR0NMRlR0a1ZKVS9sYU9sRzRtWDdOUWkxRkhkM1k0NWVCYUV4WFdoWDJ5M1gwTG0wWm1mN0NHUlYw

    export let location;
    $: params = parseGetParams(location.search);

    let password;
    let passwordRepeated;
    let isPasswordConfirmed = false;

    function confirmPassword() {
        if (isPasswordValid(password) && password === passwordRepeated) {
            Backend.confirmNewPwd(params.email, password, params.code)
                .then(async response => {
                    if (response.ok) {
                        isPasswordConfirmed = true;
                    } else {
                        console.error(response);
                        console.error(await response.text());
                    }
                });
        }

    }

</script>

<form class="auth-container">
    <figure class="emblem">
        <img src="{Logo}" alt="" />
    </figure>

    {#if !isPasswordConfirmed}
        <p class="label">Введите новый пароль</p>
        
        <PasswordField idIcon={"icon1"} idPassword={"passwordWrite"} labelContent={"Пароль"} bind:inputContent={password}/>
        <PasswordField idIcon={"icon2"} idPassword={"passwordRepite"} labelContent={"Повторить пароль"} bind:inputContent={passwordRepeated}/>
        
        <div class="btn-holder">
            <button class="btn__raised btn-primary" on:click|preventDefault={confirmPassword}>
                Сохранить
            </button>
        </div>
    {:else}
        <p class="label">Пароль успешно сброшен! Теперь вы можете снова войти в свой аккаунт.</p>
        <div class="btn-holder">
            <button class="btn__raised btn-primary" on:click|preventDefault={() => navigate(Nav.SIGN_IN, {replace: true})}>
                Войти
            </button>
        </div>
    {/if}
</form>

<style>
    .btn-holder {
        margin: 8px auto;
    }
</style>