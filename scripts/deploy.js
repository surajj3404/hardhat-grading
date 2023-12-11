// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat")
const { ethers } = require("hardhat")

async function main() {
    const GradeStorageFactory = await ethers.getContractFactory("GradeStorage")
    console.log("Deploying GradeStorage...")
    const gradeStorage = await GradeStorageFactory.deploy()
    await gradeStorage.waitForDeployment()
    console.log("GradeStorage deployed to:", gradeStorage)

    const currentGPA = await gradeStorage.getGPA()
    console.log("Current GPA:", currentGPA.toString())

    const transaction = await gradeStorage.addGrade("APL107", 7, 4)
    await transaction.wait()

    const newGPA = await gradeStorage.getGPA()
    console.log("New GPA:", newGPA.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
