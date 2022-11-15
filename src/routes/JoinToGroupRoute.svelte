<script>
    import { navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import { Nav } from "../navigation";
    import Logo from "../assets/Logo.svg"
    import { onMount } from "svelte"
    import { parseGetParams } from "../utils";
    
    export let location;

    let status = 0;

    onMount(() => {
        const params = parseGetParams(location.search);

        Backend.joinGroup(params.groupId)
            .then(async (response) => {
                if (response.ok) {
                    status = 1;
                }
                else {
                    status = 2;
                    console.error(await response.text());
                }
            })
    });
    
</script>

{#if status == 1}
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
{:else if status == 2}
    <form class="auth-container">
        <picture class="emblem">
            <img src="{Logo}" alt="" />
        </picture>

        <h2 class="label">Вам необходимо войти, чтобы присоединиться к компании</h2>
            <div class="btn-holder">
                <button class="btn__raised btn-primary" 
                on:click|preventDefault={() => navigate(Nav.SIGN_IN, { replace: true })}>Войти</button>
            </div>
    </form>
{/if}