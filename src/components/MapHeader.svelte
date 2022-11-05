<script>
    import { createEventDispatcher } from "svelte";



    const dispatch = createEventDispatcher();    

    export let className = "";
    export let name = "";
    export let isSignedIn;

    function onSignInClicked() {
        dispatch("signin");
    }
</script>

<div class={className}>
    {#if isSignedIn}
        <p>{name}</p>
    {:else}
        <button style="padding: 16px 32px;" on:click={() => onSignInClicked()}>Войти <i style="margin-left: 8px;" class="fa-solid fa-arrow-right-to-bracket"></i></button>
    {/if}
</div>

