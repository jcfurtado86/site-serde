import { execSync } from "child_process"
import { resolve } from "path"

const root = resolve(__dirname, "..")

function run(label: string, command: string) {
  console.log(`\n${"=".repeat(50)}`)
  console.log(`  ${label}`)
  console.log("=".repeat(50))
  execSync(command, { cwd: root, stdio: "inherit" })
  console.log(`✔ ${label} concluído`)
}

// A ordem importa: update-members lê tccs.ts para decidir quem é egresso
// (egresso no DGP + orientação concluída). Se rodasse antes, leria os dados
// do ciclo anterior e o aluno que acabou de concluir ficaria de fora.
run("Atualizando publicações e orientações (Lattes)", "npx tsx scripts/update-lattes.ts")
run("Enriquecendo orientações (Repositório UNIFAP)", "npx tsx scripts/update-repository.ts")
run("Atualizando membros (CNPq DGP)", "npx tsx scripts/update-members.ts")

console.log(`\n${"=".repeat(50)}`)
console.log("  Tudo atualizado!")
console.log("=".repeat(50))
console.log("\nPróximos passos:")
console.log("  git add src/app/context/data/ public/members/")
console.log('  git commit -m "atualizar dados"')
console.log("  git push")
