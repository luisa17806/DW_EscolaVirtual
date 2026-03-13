const selectSerie = document.getElementById('serie');
const blocoLingua = document.getElementById('bloco-segunda-lingua');
const radiosLingua = document.querySelector('input[name="segunda_lingua"]');

selectSerie.addEventListener('change', function(){
    if(this.value ==='5ano'){
        blocoLingua.style.display = 'block';
    }else{
        blocoLingua.style.display = 'none';
        radiosLingua.forEach(r => r.checked = false)
    }
});
const selectTurno = document.getElementsByName('turno');
const blocoTurno = document.getElementById('bloco-telefone-tarde');

selectTurno.forEach(radio => {
    radio.addEventListener('change', function(){
        if (this.value === 'tarde'){
            blocoTurno.style.display = 'block';
        } else {
            blocoTurno.style.display = 'none';
        }
    });
});

document.getElementById('nascimento').addEventListener('change', function(){
    const nascimento = new Date(this.value);
    const hoje = new Date();

    if(!this.value){
        document.getElementById('idade').value = '';
    }

    let anos = hoje.getFullYear() - nascimento.getFullYear();

    document.getElementById('idade').value = `${anos} anos`;
});

const campoCep = document.getElementById('cep');

campoCep.addEventListener('input', function(){
    let valor = this.value.replace(/\D/g,'');

    if(valor.length > 5){

        valor = valor.slice(0,5) + '-'+ valor.slice(5,8);
    }

    this.value = valor;
});

document.getElementById('cpf').addEventListener('input',function(e){
    let valor = e.target.value.replace(/\D/g,'');

    if(valor.length <= 11){
        valor = valor
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1.$2');
    }

    e.target.value = valor;
});

document.getElementById('matricula').addEventListener('input', function(e){
    let valor = e.target.value.replace(/\D/g,'');

    if(valor.length <= 6){
        valor = valor
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{2})(\d)/, '$1-$2');
    }

    e.target.value = valor;

});

campoCep.addEventListener('blur', function(){
    const cepLimpo = this.value.replace(/\D/g,'');

    if(cepLimpo.length !== 8){
        if(cepLimpo.length > 0){
            alert('CEP digitado é invalido');
        }
        return;
    }

    fetch(`http://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(r => {
            if(!r.ok) throw new Error('Erro na Rede!');
            return r.json();
        })
        .then(dados => {
            if(dados.erro){
                alert('CEP não encontrado!');
                return;
            }

            console.log(dados);

            document.getElementById('logradouro').value = dados.logradouro || '';
            document.getElementById('bairro').value = dados.bairro || "";
            document.getElementById('cidade').value = dados.localidade || "";
            document.getElementById('estado').value = dados.uf || "";
            document.getElementById('ibge').value = dados.ibge || "";

            document.getElementById('numero').focus;            
            
        })

});