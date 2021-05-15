"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const Generator = require("yeoman-generator");
class default_1 extends Generator {
    constructor(args, options) {
        super(args, options);
        this.argument("kataname", { type: String, required: false });
        this.argument("description", { type: String, required: false });
        this.argument("author", { type: String, required: false });
    }
    async prompting() {
        this.log(yosay(`Welcome to the ${chalk.yellow('Create Kata')} Generator!`));
        this.answers = await this.prompt([
            {
                type: "input",
                name: "kataname",
                message: "Your kata name",
                default: "Kata",
                when: () => !this.options["name"]
            },
            {
                type: "input",
                name: "description",
                message: "Describe your kata",
                default: "lorem ipsum",
                when: () => !this.options["description"]
            },
            {
                type: "input",
                name: "author",
                message: "Your author name",
                default: require("os").userInfo().username,
                when: () => !this.options["author"],
                store: true
            },
            {
                type: "confirm",
                name: "vscodeSupport",
                message: "Would you like to enable Visual Studio Code Support?",
                default: true,
                store: true
            }
        ]);
        // TODO: No npm support currently
        // this.destinationRoot(this.answers.kataname);
    }
    writing() {
        if (this.answers.vscodeSupport) {
            this.fs.copy(this.templatePath(".vscode"), this.destinationPath(`.vscode`));
        }
        this.fs.copyTpl(this.templatePath("specs/_implementation.spec.ts"), this.destinationPath(`specs/${_.kebabCase(this.answers.kataname)}.spec.ts`), {
            projectName: _.upperFirst(_.camelCase(this.answers.kataname)),
            srcPathName: _.kebabCase(this.answers.kataname),
            variableName: _.camelCase(this.answers.kataname.toLowerCase()),
            description: this.answers.description
        });
        this.fs.copyTpl(this.templatePath("src/_implementation.ts"), this.destinationPath(`src/${_.kebabCase(this.answers.kataname)}.ts`), {
            projectName: _.upperFirst(_.camelCase(this.answers.kataname))
        });
        this.fs.copy(this.templatePath("_.eslintignore"), this.destinationPath(`.eslintignore`));
        this.fs.copy(this.templatePath("_.eslintrc"), this.destinationPath(`.eslintrc`));
        this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(`.gitignore`));
        this.fs.copy(this.templatePath("_jest.config.js"), this.destinationPath(`jest.config.js`));
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath(`package.json`), {
            projectName: _.kebabCase(this.answers.kataname),
            description: this.answers.description,
            author: this.answers.author
        });
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath(`tsconfig.json`));
    }
    end() {
        this.log(chalk.yellow('Enjoy practicing your kata!'));
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map