using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Zadanko3.Helpers
{
    public class MapperToCSV
    {
        public static string CsvConverter<T>(IEnumerable<T> items)
        {

            Type itemType = typeof(T);
            var itemFieldsNames = itemType.GetProperties(BindingFlags.Public | BindingFlags.Instance).OrderBy(x => x.Name);

            StringBuilder csvString = new StringBuilder();

            csvString.AppendLine(string.Join(", ", itemFieldsNames.Select(x => x.Name)));

            foreach (var item in items)
                csvString.AppendLine(string.Join(", ", itemFieldsNames.Select(x => x.GetValue(item, null))));

            return csvString.ToString();
        }
    }
}
