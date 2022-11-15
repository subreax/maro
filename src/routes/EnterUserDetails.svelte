<script>
    import { navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import Textfield from "../components/Textfield.svelte";
    import Numberfield from "../components/Numberfield.svelte";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"

    let firstname;
    let lastname;
    let age;

    function confirmRegistration() {
        Backend.addUserDetails(firstname, lastname, age)
            .then(() => {
                navigate(Nav.MAP, { replace: true });
            })
            .catch(async (response2) => {
                console.error(await response2.text());
            })
    }
</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="{Logo}" alt="" />
    </picture>

    <p class="label">
        Введите свои персональные данные
    </p>

    <Textfield 
        type="text"
        labelContent={"Имя"}
        bind:inputContent={firstname}
    />

    <Textfield 
        type="text"
        labelContent={"Фамилия"}
        bind:inputContent={lastname}
    />

    <Numberfield
        labelContent={"Возраст"}
        bind:inputContent={age}
    />

    <button class="btn__raised btn-primary" style="margin-top: 8px;" on:click|preventDefault={confirmRegistration}>
        Подтвердить
    </button>
</form>