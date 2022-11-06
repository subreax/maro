<script>
    import { Backend } from "../backend";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let className = "";
    export let name;
    export let isSignedIn;

    function onSignInClicked() {
        dispatch("signin");
    }

    function onSignOutClicked() {
        Backend.signOut()
            .then(() => {
                dispatch("userupdate")
            })
    }

</script>


<div class="{className} header">
    {#if isSignedIn}
        <div class="user">
            <div class="circle"></div>
            <p class="username">{name}</p>    
        </div>
        <button class="button" on:click|preventDefault={onSignOutClicked}>
            Выйти 
            <i style="margin-left: 8px;" class="fa-solid fa-right-from-bracket"></i>
        </button>
    {:else}
        <div class="user">
            <div class="circle"></div>
            <p class="username">{name}</p>    
        </div>
        <button class="button" on:click|preventDefault={onSignInClicked}>
            Войти
            <i style="margin-left: 8px;" class="fa-solid fa-right-to-bracket"></i>
        </button>    
    {/if}
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        padding: 0px 0px 0px 5px;
    }

    .user {
        display: flex;
        align-items: center;
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

    .button {
        padding: 16px 16px 16px 16px;
    }
</style>