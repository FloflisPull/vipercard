
/* auto */ import { allVpcTokens, tks } from './vpcTokens';

/**
 * parser class for VPC language.
 * generated by the genparse Python script.
 */
export class VpcChvParser extends chevrotain.CstParser {
    constructor() {
        super(allVpcTokens, {
            recoveryEnabled: false,
            outputCst: true,
            maxLookahead: 4 // better to set it definitely.
            // would set to 6 but it can get exponentially slower
            // and i think we'll get a warning if it's too small
        });

        this.performSelfAnalysis();
    }

    /* generated code, any changes past this point will be lost: --------------- */

    RuleHAllPropertiesThatCouldBeUnary = this.RULE(
        'RuleHAllPropertiesThatCouldBeUnary',
        () => {
            this.OR1([
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkAllUnaryPropertiesIfNotAlready);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkAllNullaryOrUnaryPropertiesIfNotAlready);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks._id);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks._marked);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks._number);
                    }
                }
            ]);
        }
    );

    RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary = this.RULE(
        'RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary',
        () => {
            this.OR1([
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleHAnyFnName);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkAllNullaryOrUnaryPropertiesIfNotAlready);
                    }
                }
            ]);
        }
    );

    RuleHAnyFnName = this.RULE('RuleHAnyFnName', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkIdentifier);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._windows);
                }
            }
        ]);
    });

    RuleHAnyAllowedVariableName = this.RULE('RuleHAnyAllowedVariableName', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkIdentifier);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._number);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkA);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkAllUnaryPropertiesIfNotAlready);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkAllNullaryOrUnaryPropertiesIfNotAlready);
                }
            }
        ]);
    });

    RuleObject = this.RULE('RuleObject', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectSpecial);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectBtn);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectFld);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectCard);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectBg);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectStack);
                }
            }
        ]);
    });

    RuleObjectBtn = this.RULE('RuleObjectBtn', () => {
        this.OPTION1(() => {
            this.SUBRULE1(this.RuleOrdinal);
        });
        this.OPTION2(() => {
            this.OR1([
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkCard);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkBg);
                    }
                }
            ]);
        });
        this.OR2([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkBtn);
                    this.CONSUME1(tks._id);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks.tkBtn);
                    this.SUBRULE2(this.RuleLvl6Expression);
                }
            }
        ]);
        this.OPTION3(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectCard);
        });
    });

    RuleObjectFld = this.RULE('RuleObjectFld', () => {
        this.OPTION1(() => {
            this.SUBRULE1(this.RuleOrdinal);
        });
        this.OPTION2(() => {
            this.OR1([
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkCard);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkBg);
                    }
                }
            ]);
        });
        this.OR2([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkFld);
                    this.CONSUME1(tks._id);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks.tkFld);
                    this.SUBRULE2(this.RuleLvl6Expression);
                }
            }
        ]);
        this.OPTION3(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectCard);
        });
    });

    RuleObjectCard = this.RULE('RuleObjectCard', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks._recent);
                    this.CONSUME1(tks.tkCard);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._back);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._forth);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks.tkCard);
                    this.CONSUME1(tks._id);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.CONSUME1(tks._marked);
                    });
                    this.CONSUME3(tks.tkCard);
                    this.SUBRULE2(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkCardAtEndOfLine);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleOrdinal);
                    this.OPTION2(() => {
                        this.CONSUME2(tks._marked);
                    });
                    this.CONSUME4(tks.tkCard);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RulePosition);
                    this.OPTION3(() => {
                        this.CONSUME3(tks._marked);
                    });
                    this.CONSUME5(tks.tkCard);
                }
            }
        ]);
        this.OPTION4(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectBg);
        });
    });

    RuleObjectBg = this.RULE('RuleObjectBg', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkBg);
                    this.CONSUME1(tks._id);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks.tkBg);
                    this.SUBRULE2(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkBgAtEndOfLine);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleOrdinal);
                    this.CONSUME3(tks.tkBg);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RulePosition);
                    this.CONSUME4(tks.tkBg);
                }
            }
        ]);
        this.OPTION1(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectStack);
        });
    });

    RuleObjectStack = this.RULE('RuleObjectStack', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkPosition);
                    this.CONSUME1(tks.tkStack);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks.tkStack);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME3(tks.tkStack);
                    this.CONSUME1(tks._id);
                    this.SUBRULE2(this.RuleLvl6Expression);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkStackAtEndOfLine);
                }
            }
        ]);
    });

    RuleObjectPart = this.RULE('RuleObjectPart', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectBtn);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectFld);
                }
            },
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.OR2([
                            {
                                ALT: () => {
                                    this.CONSUME1(tks.tkCard);
                                }
                            },
                            {
                                ALT: () => {
                                    this.CONSUME1(tks.tkBg);
                                }
                            }
                        ]);
                    });
                    this.OR3([
                        {
                            ALT: () => {
                                this.CONSUME1(tks.tkPart);
                                this.CONSUME1(tks._id);
                                this.SUBRULE1(this.RuleLvl6Expression);
                            }
                        },
                        {
                            ALT: () => {
                                this.CONSUME2(tks.tkPart);
                                this.SUBRULE2(this.RuleLvl6Expression);
                            }
                        },
                        {
                            ALT: () => {
                                this.SUBRULE1(this.RuleOrdinal);
                                this.CONSUME3(tks.tkPart);
                            }
                        }
                    ]);
                    this.OPTION2(() => {
                        this.SUBRULE1(this.RuleOf);
                        this.SUBRULE1(this.RuleObjectCard);
                    });
                }
            }
        ]);
    });

    RuleObjectSpecial = this.RULE('RuleObjectSpecial', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkTopObject);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._me);
                }
            },
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.CONSUME1(tks._the);
                    });
                    this.CONSUME1(tks._target);
                }
            }
        ]);
    });

    RuleOf = this.RULE('RuleOf', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkOfOnly);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkInOnly);
                }
            }
        ]);
    });

    RuleOrdinal = this.RULE('RuleOrdinal', () => {
        this.OPTION1(() => {
            this.CONSUME1(tks._the);
        });
        this.CONSUME1(tks.tkOrdinal);
    });

    RulePosition = this.RULE('RulePosition', () => {
        this.OPTION1(() => {
            this.CONSUME1(tks._the);
        });
        this.CONSUME1(tks.tkPosition);
    });

    RuleMenuItem = this.RULE('RuleMenuItem', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleOrdinal);
                    this.CONSUME1(tks._menuItem);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks._menuItem);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            }
        ]);
    });

    RuleMenu = this.RULE('RuleMenu', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleOrdinal);
                    this.CONSUME1(tks._menu);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks._menu);
                    this.SUBRULE1(this.RuleLvl6Expression);
                }
            }
        ]);
    });

    RuleWindow_1 = this.RULE('RuleWindow_1', () => {
        this.OPTION1(() => {
            this.CONSUME1(tks._the);
        });
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkCard);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkIdentifier);
                }
            }
        ]);
        this.CONSUME1(tks._window);
    });

    RuleWindow = this.RULE('RuleWindow', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleWindow_1);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleMessageBox);
                }
            }
        ]);
    });

    RuleMessageBox = this.RULE('RuleMessageBox', () => {
        this.OPTION1(() => {
            this.CONSUME1(tks._the);
        });
        this.CONSUME1(tks._message);
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks._box);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._window);
                }
            }
        ]);
    });

    RuleHSimpleContainer = this.RULE('RuleHSimpleContainer', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleMenu);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleMessageBox);
                }
            },
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.CONSUME1(tks._the);
                    });
                    this.CONSUME1(tks._selection);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObjectPart);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHAnyAllowedVariableName);
                }
            }
        ]);
    });

    RuleHContainer = this.RULE('RuleHContainer', () => {
        this.OPTION1(() => {
            this.SUBRULE1(this.RuleHChunk);
        });
        this.SUBRULE1(this.RuleHSimpleContainer);
    });

    RuleHChunk = this.RULE('RuleHChunk', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleOrdinal);
                    this.CONSUME1(tks.tkChunkGranularity);
                }
            },
            {
                ALT: () => {
                    this.CONSUME2(tks.tkChunkGranularity);
                    this.SUBRULE1(this.RuleHChunkBound);
                    this.OPTION1(() => {
                        this.CONSUME1(tks._to);
                        this.SUBRULE2(this.RuleHChunkBound);
                    });
                }
            }
        ]);
        this.SUBRULE1(this.RuleOf);
    });

    RuleHChunkBound = this.RULE('RuleHChunkBound', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkLParen);
                    this.SUBRULE1(this.RuleExpr);
                    this.CONSUME1(tks.tkRParen);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkNumLiteral);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHSimpleContainer);
                }
            }
        ]);
    });

    RuleHSource = this.RULE('RuleHSource', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHSource_1);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHGenericFunctionCall);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHSimpleContainer);
                }
            }
        ]);
    });

    RuleHSource_1 = this.RULE('RuleHSource_1', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkStringLiteral);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkNumLiteral);
                }
            }
        ]);
    });

    RuleHFnCallWParens = this.RULE('RuleHFnCallWParens', () => {
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHAnyFnName);
                    this.CONSUME1(tks.tkLParen);
                    this.MANY_SEP1({
                        SEP: tks.tkComma,
                        DEF: () => {
                            this.SUBRULE1(this.RuleExpr);
                        }
                    });
                    this.CONSUME1(tks.tkRParen);
                }
            }
        ]);
    });

    RuleHUnaryPropertyGet = this.RULE('RuleHUnaryPropertyGet', () => {
        this.OPTION1(() => {
            this.CONSUME1(tks._the);
        });
        this.OPTION2(() => {
            this.CONSUME1(tks.tkAdjective);
        });
        this.SUBRULE1(this.RuleHAllPropertiesThatCouldBeUnary);
        this.CONSUME1(tks.tkOfOnly);
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleObject);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleWindow);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleMenuItem);
                    this.SUBRULE1(this.RuleOf);
                    this.SUBRULE1(this.RuleMenu);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHChunk);
                    this.SUBRULE1(this.RuleObjectFld);
                }
            }
        ]);
    });

    RuleHOldStyleFnNonNullary = this.RULE('RuleHOldStyleFnNonNullary', () => {
        this.CONSUME1(tks._the);
        this.SUBRULE1(this.RuleHAnyFnName);
        this.CONSUME1(tks.tkOfOnly);
        this.SUBRULE1(this.RuleExpr);
    });

    RuleHOldStyleFnNullaryOrNullaryPropGet = this.RULE(
        'RuleHOldStyleFnNullaryOrNullaryPropGet',
        () => {
            this.CONSUME1(tks._the);
            this.OPTION1(() => {
                this.CONSUME1(tks.tkAdjective);
            });
            this.SUBRULE1(this.RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary);
        }
    );

    RuleHGenericFunctionCall = this.RULE('RuleHGenericFunctionCall', () => {
        this.OR1({
            MAX_LOOKAHEAD: 5,
            DEF: [
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleFnCallNumberOf);
                    }
                },
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleFnCallThereIs);
                    }
                },
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleHFnCallWParens);
                    }
                },
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleHUnaryPropertyGet);
                    }
                },
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleHOldStyleFnNonNullary);
                    }
                },
                {
                    ALT: () => {
                        this.SUBRULE1(this.RuleHOldStyleFnNullaryOrNullaryPropGet);
                    }
                }
            ]
        });
    });

    RuleFnCallNumberOf = this.RULE('RuleFnCallNumberOf', () => {
        this.CONSUME1(tks._the);
        this.CONSUME1(tks._number);
        this.CONSUME1(tks.tkOfOnly);
        this.OR1([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleFnCallNumberOf_1);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleFnCallNumberOf_5);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleFnCallNumberOf_6);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleFnCallNumberOf_7);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleFnCallNumberOf_8);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleFnCallNumberOf_9);
                }
            }
        ]);
    });

    RuleFnCallNumberOf_1 = this.RULE('RuleFnCallNumberOf_1', () => {
        this.OPTION1(() => {
            this.OR1([
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkCard);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkBg);
                    }
                }
            ]);
        });
        this.OR2([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkBtnPlural);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkPartPlural);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkFldPlural);
                }
            }
        ]);
        this.OPTION2(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectCard);
        });
    });

    RuleFnCallNumberOf_5 = this.RULE('RuleFnCallNumberOf_5', () => {
        this.CONSUME1(tks._marked);
        this.CONSUME1(tks.tkCardPlural);
    });

    RuleFnCallNumberOf_6 = this.RULE('RuleFnCallNumberOf_6', () => {
        this.CONSUME1(tks.tkCardPlural);
        this.OPTION1(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectBg);
        });
    });

    RuleFnCallNumberOf_7 = this.RULE('RuleFnCallNumberOf_7', () => {
        this.CONSUME1(tks.tkBgPlural);
        this.OPTION1(() => {
            this.SUBRULE1(this.RuleOf);
            this.SUBRULE1(this.RuleObjectStack);
        });
    });

    RuleFnCallNumberOf_8 = this.RULE('RuleFnCallNumberOf_8', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks._windows);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._menu);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._menuItem);
                    this.SUBRULE1(this.RuleOf);
                    this.SUBRULE1(this.RuleMenu);
                }
            }
        ]);
    });

    RuleFnCallNumberOf_9 = this.RULE('RuleFnCallNumberOf_9', () => {
        this.CONSUME1(tks.tkChunkGranularity);
        this.SUBRULE1(this.RuleOf);
        this.SUBRULE1(this.RuleLvl3Expression);
    });

    RuleFnCallThereIs = this.RULE('RuleFnCallThereIs', () => {
        this.CONSUME1(tks._there);
        this.CONSUME1(tks._is);
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks._no);
                }
            },
            {
                ALT: () => {
                    this.OPTION1(() => {
                        this.CONSUME1(tks._not);
                    });
                    this.CONSUME1(tks.tkA);
                }
            }
        ]);
        this.SUBRULE1(this.RuleObject);
    });

    RuleAnyPropertyVal = this.RULE('RuleAnyPropertyVal', () => {
        this.AT_LEAST_ONE_SEP1({
            SEP: tks.tkComma,
            DEF: () => {
                this.SUBRULE1(this.RuleLvl1Expression);
            }
        });
    });

    RuleExpr = this.RULE('RuleExpr', () => {
        this.SUBRULE1(this.RuleLvl1Expression);
        this.MANY1(() => {
            this.SUBRULE1(this.RuleAndOrOr);
            this.SUBRULE2(this.RuleLvl1Expression);
        });
    });

    RuleLvl1Expression = this.RULE('RuleLvl1Expression', () => {
        this.SUBRULE1(this.RuleLvl2Expression);
        this.MANY1(() => {
            this.SUBRULE1(this.RuleContainsOrGreaterLessEqual);
            this.SUBRULE2(this.RuleLvl2Expression);
        });
    });

    RuleLvl2Expression = this.RULE('RuleLvl2Expression', () => {
        this.SUBRULE1(this.RuleLvl3Expression);
        this.MANY1(() => {
            this.CONSUME1(tks._is);
            this.SUBRULE1(this.RuleIsExpression);
        });
    });

    RuleLvl3Expression = this.RULE('RuleLvl3Expression', () => {
        this.SUBRULE1(this.RuleLvl4Expression);
        this.MANY1(() => {
            this.CONSUME1(tks.tkStringConcat);
            this.SUBRULE2(this.RuleLvl4Expression);
        });
    });

    RuleLvl4Expression = this.RULE('RuleLvl4Expression', () => {
        this.SUBRULE1(this.RuleLvl5Expression);
        this.MANY1(() => {
            this.CONSUME1(tks.tkPlusOrMinus);
            this.SUBRULE2(this.RuleLvl5Expression);
        });
    });

    RuleLvl5Expression = this.RULE('RuleLvl5Expression', () => {
        this.SUBRULE1(this.RuleLvl6Expression);
        this.MANY1(() => {
            this.CONSUME1(tks.tkMultDivideExpDivMod);
            this.SUBRULE2(this.RuleLvl6Expression);
        });
    });

    RuleLvl6Expression = this.RULE('RuleLvl6Expression', () => {
        this.OPTION1(() => {
            this.OR1([
                {
                    ALT: () => {
                        this.CONSUME1(tks.tkPlusOrMinus);
                    }
                },
                {
                    ALT: () => {
                        this.CONSUME1(tks._not);
                    }
                }
            ]);
        });
        this.OPTION2(() => {
            this.SUBRULE1(this.RuleHChunk);
        });
        this.OR2([
            {
                ALT: () => {
                    this.SUBRULE1(this.RuleHSource);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkLParen);
                    this.SUBRULE1(this.RuleExpr);
                    this.CONSUME1(tks.tkRParen);
                }
            }
        ]);
    });

    RuleAndOrOr = this.RULE('RuleAndOrOr', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks._or);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks._and);
                }
            }
        ]);
    });

    RuleContainsOrGreaterLessEqual = this.RULE('RuleContainsOrGreaterLessEqual', () => {
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks._contains);
                }
            },
            {
                ALT: () => {
                    this.CONSUME1(tks.tkGreaterOrLessEqualOrEqual);
                }
            }
        ]);
    });

    RuleIsExpression = this.RULE('RuleIsExpression', () => {
        this.OPTION1(() => {
            this.CONSUME1(tks._not);
        });
        this.OR1([
            {
                ALT: () => {
                    this.CONSUME1(tks.tkA);
                    this.OR2([
                        {
                            ALT: () => {
                                this.CONSUME1(tks._number);
                            }
                        },
                        {
                            ALT: () => {
                                this.CONSUME1(tks.tkIdentifier);
                            }
                        }
                    ]);
                }
            },
            {
                ALT: () => {
                    this.OR3([
                        {
                            ALT: () => {
                                this.CONSUME1(tks.tkInOnly);
                            }
                        },
                        {
                            ALT: () => {
                                this.CONSUME1(tks._within);
                            }
                        }
                    ]);
                    this.SUBRULE1(this.RuleLvl3Expression);
                }
            },
            {
                ALT: () => {
                    this.SUBRULE2(this.RuleLvl3Expression);
                }
            }
        ]);
    });
    /* generated code, any changes above this point will be lost: --------------- */
}
