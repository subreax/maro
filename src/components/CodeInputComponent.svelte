<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { CodeInputStyle } from "./CodeInputStyle"
    
    const dispatch = createEventDispatcher();

    export let digits = 4;
    export let style = CodeInputStyle.NONE;

    let component;
    let inputs;
    let currentInputIndex = 0;

    let enteredCode = Array(digits).fill("");
    $: {
        let isCodeEntered = true;
        for (let i = 0; i < digits; ++i) {
            if (enteredCode[i].length === 0) {
                isCodeEntered = false;
                break;
            }
        }

        if (isCodeEntered) {
            dispatch("code", { code: enteredCode.join("") })
        } 
        else {
            style = CodeInputStyle.NONE;
        }
    }

    function isDigit(character) {
        const digit = character ? character.codePointAt(0) - 48 : -1;
        return digit >= 0 && digit <= 9;
    }

    function setCarretToEnd() {
        inputs[currentInputIndex].setSelectionRange(2, 2);
    }


    function setInput(i) {
        if (i < 0) {
            i = 0;
        }
        else if (i >= digits) {
            i = digits-1;
        }
        currentInputIndex = i;
    }

    function getInput() {
        return inputs[currentInputIndex];
    }


    function getDigit() {
        return enteredCode[currentInputIndex];
    }

    function setDigit(val) {
        enteredCode[currentInputIndex] = val;
    }


    function onInputEntered(event) {
        event.preventDefault();

        const data = event.key;
        const charRemoved = event.inputType !== undefined && event.inputType.startsWith("deleteContent");

        if (!charRemoved) {
            if (isDigit(data)) {
                if (getDigit().length > 0) {
                    setInput(currentInputIndex+1);
                }

                if (getDigit().length === 0) {
                    setDigit(data);
                }
            }
        }
        else {
            setInput(currentInputIndex-1);
        }

        getInput().focus();
        setCarretToEnd();
    }

    function onInputClicked(event) {
        for (let i = 0; i < digits; ++i) {
            if (inputs[i] === event.target) {
                setInput(i);
                break;
            }
        }

        if (getDigit().length === 0) {
            while (currentInputIndex > 0) {
                if (getDigit().length !== 0) {
                    break;
                }
                --currentInputIndex;
            }
        } 
        else {
            while (currentInputIndex < digits) {
                if (getDigit().length === 0) {
                    break;
                }
                ++currentInputIndex;
            }
            --currentInputIndex;
        }

        getInput().focus();
        setCarretToEnd();
    }

    onMount(() => {
        inputs = component.childNodes;
    });

</script>

<div bind:this={component} on:input={onInputEntered} on:click={onInputClicked}>
    {#each Array(digits) as _, i (i)}
        <input  class:correct={style===CodeInputStyle.CORRECT} 
                class:wrong={style===CodeInputStyle.WRONG} 
                type="text" 
                maxlength="2" 
                bind:value={enteredCode[i]} 
                on:keypress={onInputEntered}
                style="transition: background-color {(i+1)/digits * 0.5}s">
    {/each}
</div>

<style>
    input {
        box-sizing: border-box;
        font-size: inherit;
        background: #00000021;
        width: 3em;
        line-height: 3em;
        padding: 0;
        margin: 8px;
        border: none;
        border-radius: 0.5em;
        text-align: center;
        outline: none;
        font-weight: 600;
    }

    input.correct {
        background: #2bef2873;
    }

    input.wrong {
        background: #ff000073;
    }

</style>
