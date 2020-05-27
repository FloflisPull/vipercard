
/* auto */ import { BrowserOSInfo } from './../../ui512/utils/util512Higher';
/* auto */ import { assertTrue } from './../../ui512/utils/util512Assert';
/* auto */ import { assertEq, longstr } from './../../ui512/utils/util512';
/* auto */ import { FormattedText } from './../../ui512/drawtext/ui512FormattedText';
/* auto */ import { UI512FontRequest } from './../../ui512/drawtext/ui512DrawTextFontRequest';
/* auto */ import { TextFontSpec, TextFontStyling, largeArea, specialCharFontChange } from './../../ui512/drawtext/ui512DrawTextClasses';
/* auto */ import { DrawTextArgs } from './../../ui512/drawtext/ui512DrawTextArgs';
/* auto */ import { UI512DrawText } from './../../ui512/drawtext/ui512DrawText';
/* auto */ import { SimpleUtil512TestCollection, assertThrows } from './../testUtils/testUtils';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * tests on FormattedText
 */
let t = new SimpleUtil512TestCollection('testCollectionUI512FormattedText');
export let testCollectionUI512FormattedText = t;

t.test('FormattedText.CharAt', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    assertEq('abc'.charCodeAt(0), txt.charAt(0), 'By|');
    assertEq('abc'.charCodeAt(1), txt.charAt(1), 'Bx|');
    assertEq('abc'.charCodeAt(2), txt.charAt(2), 'Bw|');
    assertEq(undefined, txt.charAt(3), 'Bv|');
});
t.test('FormattedText.FontAt', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(0), 'Bu|');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(1), 'Bt|');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(2), 'Bs|');
    assertEq(undefined, txt.fontAt(3), 'Br|');
});
t.test('FormattedText.SetCharAt', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    txt.setCharAt(1, 'y'.charCodeAt(0));
    txt.setCharAt(2, 'z'.charCodeAt(0));
    assertEq('ayz'.charCodeAt(0), txt.charAt(0), 'Bq|');
    assertEq('ayz'.charCodeAt(1), txt.charAt(1), 'Bp|');
    assertEq('ayz'.charCodeAt(2), txt.charAt(2), 'Bo|');
});
t.test('FormattedText.SetFontAt', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    txt.setFontAt(1, 'otherfont1');
    txt.setFontAt(2, 'otherfont2');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(0), 'Bn|');
    assertEq('otherfont1', txt.fontAt(1), 'Bm|');
    assertEq('otherfont2', txt.fontAt(2), 'Bl|');
});
t.test('FormattedText.Len', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    assertEq(3, txt.len(), 'Bk|');
    assertEq(0, FormattedText.newFromUnformatted('').len(), 'Bj|');
});
t.test('FormattedText.indexOf', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    assertEq(1, txt.indexOf('b'.charCodeAt(0)), 'Bi|');
    assertEq(2, txt.indexOf('c'.charCodeAt(0)), 'Bh|');
    assertEq(-1, txt.indexOf('?'.charCodeAt(0)), 'Bg|');
});
t.test('FormattedText.setFontEverywhere', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    txt.setFontEverywhere('changedfont');
    assertEq('changedfont', txt.fontAt(0), 'Bf|');
    assertEq('changedfont', txt.fontAt(1), 'Be|');
    assertEq('changedfont', txt.fontAt(2), 'Bd|');
    assertEq('abc', txt.toUnformatted(), 'Bc|');
});
t.test('FormattedText.toUnformatted', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    assertEq('abc', txt.toUnformatted(), 'Bb|');
    assertEq('a', txt.toUnformattedSubstr(0, 1), 'Ba|');
    assertEq('ab', txt.toUnformattedSubstr(0, 2), 'BZ|');
    assertEq('b', txt.toUnformattedSubstr(1, 1), 'BY|');
    assertEq('bc', txt.toUnformattedSubstr(1, 2), 'BX|');
});
t.test('FormattedTextNewFromUnformatted.EmptyStringIsOK', () => {
    let txt = FormattedText.newFromUnformatted('');
    assertEq('', txt.toUnformatted(), 'BW|');
    assertEq(0, txt.len(), 'BV|');
    assertEq(undefined, txt.charAt(0), 'BU|');
    assertEq(undefined, txt.fontAt(0), 'BT|');
});
t.test('FormattedTextNewFromUnformatted.ShouldStripSpecialCharFontChange', () => {
    assertThrows('Uj|', 'cannot include', () =>
        FormattedText.newFromUnformatted(
            `${specialCharFontChange}a${specialCharFontChange}`
        )
    );
});
t.test('FormattedTextNewFromSerialized.Complex', () => {
    let ser = longstr(
        `${specialCharFontChange}font1${specialCharFontChange}
        a${specialCharFontChange}font2${specialCharFontChange}bc
        ${specialCharFontChange}font3${specialCharFontChange}d`,
        ''
    );
    let txt = FormattedText.newFromSerialized(ser);
    assertEq(4, txt.len(), 'BO|');
    assertEq('font1', txt.fontAt(0), 'BN|');
    assertEq('font2', txt.fontAt(1), 'BM|');
    assertEq('font2', txt.fontAt(2), 'BL|');
    assertEq('font3', txt.fontAt(3), 'BK|');
    assertEq('abcd'.charCodeAt(0), txt.charAt(0), 'BJ|');
    assertEq('abcd'.charCodeAt(1), txt.charAt(1), 'BI|');
    assertEq('abcd'.charCodeAt(2), txt.charAt(2), 'BH|');
    assertEq('abcd'.charCodeAt(3), txt.charAt(3), 'BG|');

    let roundTripped = txt.toSerialized();
    assertEq(ser, roundTripped, 'BF|');
});
t.test('FormattedTextNewFromSerialized and more', () => {
    t.say(
        longstr(`FormattedTextNewFromSerialized.ImplicitDefaultFont,
            CoalesceNeighboringFontChanges,OKToEndWithFontChange`)
    );
    let ser = longstr(
        `a${specialCharFontChange}font1${specialCharFontChange}
            ${specialCharFontChange}font2${specialCharFontChange}bcd
            ${specialCharFontChange}font3${specialCharFontChange}`,
        ''
    );
    let txt = FormattedText.newFromSerialized(ser);
    assertEq(4, txt.len(), 'BE|');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(0), 'BD|');
    assertEq('font2', txt.fontAt(1), 'BC|');
    assertEq('font2', txt.fontAt(2), 'BB|');
    assertEq('font2', txt.fontAt(3), 'BA|');
    assertEq('abcd'.charCodeAt(0), txt.charAt(0), 'B9|');
    assertEq('abcd'.charCodeAt(1), txt.charAt(1), 'B8|');
    assertEq('abcd'.charCodeAt(2), txt.charAt(2), 'B7|');
    assertEq('abcd'.charCodeAt(3), txt.charAt(3), 'B6|');

    let expected = longstr(
        `${specialCharFontChange}${UI512FontRequest.defaultFont}
            ${specialCharFontChange}a${specialCharFontChange}font2${specialCharFontChange}bcd`,
        ''
    );
    assertEq(expected, txt.toSerialized(), 'B5|');
});
t.test('FormattedText.Push', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    txt.push('d'.charCodeAt(0), 'font2');
    assertEq(4, txt.len(), 'B4|');
    assertEq('abcd'.charCodeAt(2), txt.charAt(2), 'B3|');
    assertEq('abcd'.charCodeAt(3), txt.charAt(3), 'B2|');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(2), 'B1|');
    assertEq('font2', txt.fontAt(3), 'B0|');
});
t.test('FormattedText.Append', () => {
    let txt1 = FormattedText.newFromUnformatted('ab');
    txt1.setFontEverywhere('font1');
    let txt2 = FormattedText.newFromUnformatted('cd');
    txt2.setFontEverywhere('font2');
    txt1.append(txt2);
    assertEq(4, txt1.len(), 'A~|');
    assertEq('abcd'.charCodeAt(0), txt1.charAt(0), 'A}|');
    assertEq('abcd'.charCodeAt(1), txt1.charAt(1), 'A||');
    assertEq('abcd'.charCodeAt(2), txt1.charAt(2), 'A{|');
    assertEq('abcd'.charCodeAt(3), txt1.charAt(3), 'A`|');
    assertEq('font1', txt1.fontAt(0), 'A_|');
    assertEq('font1', txt1.fontAt(1), 'A^|');
    assertEq('font2', txt1.fontAt(2), 'A]|');
    assertEq('font2', txt1.fontAt(3), 'A[|');
});
t.test('FormattedText.AppendEmptyString', () => {
    let txt1 = FormattedText.newFromUnformatted('ab');
    let txt2 = FormattedText.newFromUnformatted('');
    txt1.append(txt2);
    assertEq(2, txt1.len(), 'A@|');
    assertEq('ab'.charCodeAt(0), txt1.charAt(0), 'A?|');
    assertEq('ab'.charCodeAt(1), txt1.charAt(1), 'A>|');
});
t.test('FormattedText.AppendSubstring', () => {
    let txt1 = FormattedText.newFromUnformatted('ab');
    let txt2 = FormattedText.newFromUnformatted('cdefg');
    txt1.appendSubstring(txt2, 1, 3);
    assertEq('abde', txt1.toUnformatted(), 'A=|');
});
t.test('FormattedText.SpliceDeletesTwoCharacters', () => {
    let ser = longstr(
        `a${specialCharFontChange}font2
        ${specialCharFontChange}bc${specialCharFontChange}
        font3${specialCharFontChange}d`,
        ''
    );
    let txt = FormattedText.newFromSerialized(ser);
    assertEq(4, txt.len(), 'A<|');
    txt.splice(1, 2);
    assertEq(2, txt.len(), 'A;|');
    assertEq('ad'.charCodeAt(0), txt.charAt(0), 'A:|');
    assertEq('ad'.charCodeAt(1), txt.charAt(1), 'A/|');
    assertEq(UI512FontRequest.defaultFont, txt.fontAt(0), 'A.|');
    assertEq('font3', txt.fontAt(1), 'A-|');
});
t.test('FormattedText.SpliceDeletesNoCharacters', () => {
    let txt = FormattedText.newFromUnformatted('abc');
    assertEq(3, txt.len(), 'A,|');
    txt.splice(1, 0);
    assertEq(3, txt.len(), 'A+|');
});
t.test('FormattedText.ByInsertion, from 2 chars -> 0 chars', () => {
    let txt1 = FormattedText.newFromUnformatted('abcde');
    txt1.setFontEverywhere('f1');
    let txt2 = FormattedText.byInsertion(txt1, 2, 2, '', 'f2');
    let expected = `${specialCharFontChange}f1${specialCharFontChange}abe`;
    assertEq(3, txt2.len(), 'A*|');
    assertEq(expected, txt2.toSerialized(), 'A)|');
});
t.test('FormattedText.ByInsertion, from 2 chars -> 1 char', () => {
    let txt1 = FormattedText.newFromUnformatted('abcde');
    txt1.setFontEverywhere('f1');
    let txt2 = FormattedText.byInsertion(txt1, 2, 2, 'x', 'f2');
    let expected = longstr(
        `${specialCharFontChange}
        f1${specialCharFontChange}ab${specialCharFontChange}f2
        ${specialCharFontChange}x${specialCharFontChange}f1
        ${specialCharFontChange}e`,
        ''
    );
    assertEq(4, txt2.len(), 'A(|');
    assertEq(expected, txt2.toSerialized(), 'A&|');
});
t.test('FormattedText.ByInsertion, from 2 chars -> 2 chars', () => {
    let txt1 = FormattedText.newFromUnformatted('abcde');
    txt1.setFontEverywhere('f1');
    let txt2 = FormattedText.byInsertion(txt1, 2, 2, 'xy', 'f2');
    let expected = longstr(
        `${specialCharFontChange}f1
        ${specialCharFontChange}ab${specialCharFontChange}f2
        ${specialCharFontChange}xy${specialCharFontChange}f1
        ${specialCharFontChange}e`,
        ''
    );
    assertEq(5, txt2.len(), 'A%|');
    assertEq(expected, txt2.toSerialized(), 'A$|');
});
t.test('FormattedText.ByInsertion, from 2 chars -> 3 chars', () => {
    let txt1 = FormattedText.newFromUnformatted('abcde');
    txt1.setFontEverywhere('f1');
    let txt2 = FormattedText.byInsertion(txt1, 2, 2, 'xyz', 'f2');
    let expected = longstr(
        `${specialCharFontChange}f1
        ${specialCharFontChange}ab${specialCharFontChange}
        f2${specialCharFontChange}xyz${specialCharFontChange}
        f1${specialCharFontChange}e`,
        ''
    );
    assertEq(6, txt2.len(), 'A#|');
    assertEq(expected, txt2.toSerialized(), 'A!|');
});
t.test('FormattedTextFilterAndConvertNewlines.Filter', () => {
    assertEq('', FormattedText.filterAndConvertNewlines(''), 'A |');
    assertEq('abc def', FormattedText.filterAndConvertNewlines('abc def'), 'Az|');
    assertEq(
        'abc def',
        FormattedText.filterAndConvertNewlines('\x00abc\x00 def\x00'),
        'Ay|'
    );
    assertEq('', FormattedText.filterAndConvertNewlines('\x00\x00'), 'Ax|');
});
t.test('FormattedTextFilterAndConvertNewlines.RemoveInternalUseBytes', () => {
    assertEq(
        'abc def',
        FormattedText.filterAndConvertNewlines(
            `${specialCharFontChange}abc${specialCharFontChange} def${specialCharFontChange}`
        ),
        'Aw|'
    );
    assertEq(
        '',
        FormattedText.filterAndConvertNewlines(
            `${specialCharFontChange}${specialCharFontChange}`
        ),
        'Av|'
    );
});
t.test('FormattedTextFilterAndConvertNewlines.ConvertNewlines', () => {
    assertEq(
        '\nabc\n123\n',
        FormattedText.filterAndConvertNewlines('\nabc\n123\n'),
        'Au|'
    );
    assertEq(
        '\nabc\n123\n',
        FormattedText.filterAndConvertNewlines('\r\nabc\r\n123\r\n'),
        'At|'
    );
    assertEq(
        '\nabc\n123\n',
        FormattedText.filterAndConvertNewlines('\rabc\r123\r'),
        'As|'
    );
});
t.test('FormattedTextFilterAndConvertNewlines.ConvertEveryNewlineCombination', () => {
    let expected = '\n\n\n1\n\n\n2\n\n3\n\n\n4\n\n5\n\n6\n\n7\n\n\n8';
    let input = '\n\n\n1\n\n\r2\n\r\n3\n\r\r4\r\n\n5\r\n\r6\r\r\n7\r\r\r8';
    assertEq(expected, FormattedText.filterAndConvertNewlines(input), 'Ar|');
});
t.test('FormattedText.FromExternalCharset', () => {
    let fromHost = (s: string) =>
        FormattedText.fromExternalCharset(s, BrowserOSInfo.Unknown);

    /* control chars are not accepted */
    assertEq('ab?cd?', fromHost('ab\x03cd\x03'), '1i|');

    /* more control chars are not accepted */
    assertEq('ab?cd????', fromHost('ab\x01cd\x06\x0f\x15\x1a'), '1h|');

    /* tabs are accepted */
    assertEq('ab\tcd?', fromHost('ab\tcd\x03'), '1g|');

    /* symbols are translated */
    assertEq(
        'ab' + String.fromCharCode(166, 32, 165, 32, 161),
        fromHost('ab\u00B6 \u2022 \u00B0'),
        '1d|'
    );

    /* unknown lower letters are not accepted (1/4, superscript 1, capital thorn) */
    assertEq('ab???cd', fromHost('ab\u00BC\u00B9\u00DEcd'), '1c|');

    /* unknown higher letters are not accepted */
    assertEq('12???34', fromHost('12\u05E7\u3042\uB9D034'), '1b|');

    /* different fallback */
    assertEq(
        'ab!cd!',
        FormattedText.fromExternalCharset('ab\x03cd\x03', BrowserOSInfo.Unknown, '!'),
        '1a|'
    );

    /* into charset, control chars are not accepted */
    assertEq(
        'ab?cd?',
        FormattedText.toExternalCharset('ab\x05cd\x05', BrowserOSInfo.Unknown),
        '1Z|'
    );

    /* into charset, different fallback */
    assertEq(
        'ab!cd!',
        FormattedText.toExternalCharset('ab\x05cd\x05', BrowserOSInfo.Unknown, '!'),
        '1Y|'
    );

    /* into charset, tabs are accepted */
    assertEq(
        'AB\nCD\tEF',
        FormattedText.toExternalCharset('AB\nCD\tEF', BrowserOSInfo.Unknown),
        '1X|'
    );
});
t.test('FormattedText.FromExternalCharset.UsingFromCharCode', () => {
    let fromHost = (s: string) =>
        FormattedText.fromExternalCharset(s, BrowserOSInfo.Unknown);

    /* accented letters are translated */
    assertEq(
        'ab' +
            String.fromCharCode(
                135,
                32,
                136,
                32,
                146,
                32,
                147,
                32,
                148,
                32,
                153,
                32,
                155
            ),
        fromHost('ab\u00e1 \u00e0 \u00ed \u00ec \u00ee \u00f4 \u00f5'),
        '1f|'
    );

    /* greek letters are translated */
    assertEq(
        'ab' +
            String.fromCharCode(
                185,
                32,
                184,
                32,
                183,
                32,
                181,
                32,
                190,
                32,
                174,
                32,
                207
            ),
        fromHost('ab\u03C0 \u220F \u2211 \u00B5 \u00E6 \u00C6 \u0153'),
        '1e|'
    );

    /* into charset, greek letters are translated */
    assertEq(
        'ab\u03C0 \u220F \u2211 \u00B5 \u00E6 \u00C6 \u0153',
        FormattedText.toExternalCharset(
            'ab' +
                String.fromCharCode(
                    185,
                    32,
                    184,
                    32,
                    183,
                    32,
                    181,
                    32,
                    190,
                    32,
                    174,
                    32,
                    207
                ),
            BrowserOSInfo.Unknown
        ),
        '1W|'
    );

    /* into charset, unknown letters are not accepted */
    assertEq(
        '12???34',
        FormattedText.toExternalCharset('12\u001f\u0100\u221134', BrowserOSInfo.Unknown),
        '1V|'
    );
});
t.test('FormattedTextAsteriskOnly.ZeroLength', () => {
    let args = new DrawTextArgs(0, 0, largeArea, largeArea);
    args.asteriskOnly = true;
    let textin = FormattedText.newFromUnformatted('');
    let modded = UI512DrawText.makeAsteriskOnlyIfApplicable(textin, args);
    assertEq(0, modded.len(), 'Aq|');
    assertTrue(modded.isLocked(), 'Ap|');
});
t.test('FormattedTextAsteriskOnly.NoFormattingChanges', () => {
    let args = new DrawTextArgs(0, 0, largeArea, largeArea);
    args.asteriskOnly = true;
    let textin = FormattedText.newFromUnformatted('abcd');
    let modded = UI512DrawText.makeAsteriskOnlyIfApplicable(textin, args);
    assertEq('abcd', textin.toUnformatted(), 'Ao|');
    assertEq('\xA5\xA5\xA5\xA5', modded.toUnformatted(), 'An|');
    assertEq(4, modded.len(), 'Am|');
});
t.test('FormattedTextAsteriskOnly.FormattingIsPreserved', () => {
    let args = new DrawTextArgs(0, 0, largeArea, largeArea);
    args.asteriskOnly = true;
    let font1 = new TextFontSpec('geneva', TextFontStyling.Default, 12).toSpecString();
    let font2 = new TextFontSpec('times', TextFontStyling.Bold, 14).toSpecString();
    let s = UI512DrawText.setFont('abc', font1) + UI512DrawText.setFont('def', font2);
    let expected =
        UI512DrawText.setFont('\xA5\xA5\xA5', font1) +
        UI512DrawText.setFont('\xA5\xA5\xA5', font2);
    let textin = FormattedText.newFromSerialized(s);
    let modded = UI512DrawText.makeAsteriskOnlyIfApplicable(textin, args);
    assertEq('abcdef', textin.toUnformatted(), 'Al|');
    assertEq('\xA5\xA5\xA5\xA5\xA5\xA5', modded.toUnformatted(), 'Ak|');
    assertEq(6, modded.len(), 'Aj|');
    assertEq(expected, modded.toSerialized(), 'Ai|');
});
