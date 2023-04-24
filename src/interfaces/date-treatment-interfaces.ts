/* 
Formato                     Ejemplo
------------------------   ---------------------------
YYYY                        2023
YY                          23
M MM                        4 04
MMM                         Apr
MMMM                        April
D DD                        23 23
Do                          23rd
DDD DDDDD                   113 00113
X                           1680700901
x                           1680700901982
YYYY-MM-DD                  2023-04-23
YYYY/MM/DD                  2023/04/23
YYYY.MM.DD                  2023.04.23
DD-MM-YYYY                  23-04-2023
DD/MM/YYYY                  23/04/2023
DD.MM.YYYY                  23.04.2023
YYYY-MM-DDTHH:mm:ss         2023-04-23T12:34:56
YYYY/MM/DD HH:mm:ss         2023/04/23 12:34:56
YYYY.MM.DD HH:mm:ss         2023.04.23 12:34:56
DD-MM-YYYY HH:mm:ss         23-04-2023 12:34:56
DD/MM/YYYY HH:mm:ss         23/04/2023 12:34:56
DD.MM.YYYY HH:mm:ss         23.04.2023 12:34:56
YYYY-MM-DDTHH:mm:ss.SSSZ    2023-04-23T12:34:56.789Z

*/
export type TFormat =
    | 'YYYY'
    | 'YY'
    | 'M'
    | 'MM'
    | 'MMM'
    | 'MMMM'
    | 'D'
    | 'DD'
    | 'Do'
    | 'DDD'
    | 'DDDD'
    | 'X'
    | 'x'
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD'
    | 'YYYY.MM.DD'
    | 'DD-MM-YYYY'
    | 'DD/MM/YYYY'
    | 'DD.MM.YYYY'

    | 'YYYY-MM-DDTHH:mm:ss'
    | 'YYYY-MM-DDTHH:mm'
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY-MM-DD HH:mm'
    | 'YYYY/MM/DD HH:mm:ss'
    | 'YYYY/MM/DD HH:mm'
    | 'YYYY.MM.DD HH:mm:ss'
    | 'YYYY.MM.DD HH:mm'
    | 'DD-MM-YYYY HH:mm:ss'
    | 'DD-MM-YYYY HH:mm'
    | 'DD/MM/YYYY HH:mm:ss'
    | 'DD/MM/YYYY HH:mm'
    | 'DD.MM.YYYY HH:mm:ss'
    | 'DD.MM.YYYY HH:mm'

    | 'YYYY-MM-DDThh:mm:ss A'
    | 'YYYY-MM-DDThh:mm A'
    | 'YYYY-MM-DD hh:mm:ss A'
    | 'YYYY-MM-DD hh:mm A'
    | 'YYYY/MM/DD hh:mm:ss A'
    | 'YYYY/MM/DD hh:mm A'
    | 'YYYY.MM.DD hh:mm:ss A'
    | 'YYYY.MM.DD hh:mm A'
    | 'DD-MM-YYYY hh:mm:ss A'
    | 'DD-MM-YYYY hh:mm A'
    | 'DD/MM/YYYY hh:mm:ss A'
    | 'DD/MM/YYYY hh:mm A'
    | 'DD.MM.YYYY hh:mm:ss A'
    | 'DD.MM.YYYY hh:mm A'
    | 'MM/DD/YYYY hh:mm A'
    ;
