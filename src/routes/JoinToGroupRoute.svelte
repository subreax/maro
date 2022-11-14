<script>
    import { navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"

    $: {
        Backend.joinGroup()
        .then(async (response) => {
            if (response.ok) {
                console.log("Success");
            }
            else {
                console.log(await response.text());
            }
        })
    }
    
</script>

<form class="auth-container">
    <picture class="emblem">
        <img src="{Logo}" alt="" />
    </picture>

    <h2 class="label">Вы успешно присоединились к группе</h2>
        <div class="btn-holder">
            <button class="btn__raised btn-primary" 
            on:click|preventDefault={() => navigate(Nav.MAP, { replace: true })}>Вернуться на карту</button>
        </div>
</form>

