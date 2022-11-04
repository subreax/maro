<script>
    import { createEventDispatcher } from "svelte";
    import Logo from "./Logo.svelte";

    const dispatch = createEventDispatcher();

    export let className = "";
    export let isSignedIn = false;
    export let name = "";

    function onSignInClicked() {
        dispatch("signin");
    }

</script>

<header class="component {className}">
    <Logo className="logo" />
    {#if isSignedIn}
    {:else}
        
    {/if}
</header>

<style>
    
</style>
