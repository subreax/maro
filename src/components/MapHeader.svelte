<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let className = "";
    export let name = "Карта я карта";
    export let isSignedIn = true;
    function onSignInClicked() {
        dispatch("signin");
    }
    function onSignOutClicked() {

    }
</script>

<p>{name}</p>
<div class={className}>
    {#if isSignedIn = true}
    <div class="header">
        <div class="circle">

        </div>
        <p class="username">{name}</p>
        <button style="padding: 16px 32px;" on:click={() => onSignOutClicked()}
            >Выйти <i
                style="margin-left: 8px;"
                class="fa-solid fa-arrow-right-to-bracket"
            /></button
        >
    </div>
    {:else}
        <button style="padding: 16px 32px;" on:click={() => onSignInClicked()}>Войти <i style="margin-left: 8px;" class="fa-solid fa-arrow-right-to-bracket"></i></button>
    {/if}
</div>

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 0px 0px 5px;
    }

    .circle {
        width: 40px; 
        height: 40px;
        margin-right: 12px;
        background: rgb(235, 223, 223);
        border-radius: 50%;
    }

    .username {
        font-weight: 600;
        color: #262626;
        margin-right: 5px;
    }
</style>