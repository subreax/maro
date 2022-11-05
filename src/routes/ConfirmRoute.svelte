<script>
    import { Link, navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import Textfield from "../components/Textfield.svelte";
    import Numberfield from "../components/Numberfield.svelte";
    import { parseGetParams } from "../utils"

    let userName;
    let userAge;

    export let location;
    $: {
        const params = parseGetParams(location.search);

        Backend.confirmRegistration(params.userId, params.code)
            .then(async (response) => {
                if (response.ok) {
                    navigate("/map", { replace: true });
                } else {
                    isConfirmationSuccessful = false;
                    console.log(await response.json());
                }
            });
    }

    let isConfirmationSuccessful = true;
</script>

{#if !isConfirmationSuccessful}
    <h2>Не удалось подтвердить аккаунт</h2>
    <Link to="/signin">Назад</Link>
{/if}

<form class="auth-container">
    <picture class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </picture>

    <p class="label">
        Введите свои персональные данные
    </p>

    <Textfield 
        type="text"
        labelContent={"Ваше имя"}
        bind:inputContent={userName}
    />

    <Numberfield
        labelContent={"Ваш возраст"}
        bind:inputContent={userAge}
    />

    <button class="btn__raised btn-primary" style="margin-top: 10px;">
        Подтвердить
    </button>

</form>
