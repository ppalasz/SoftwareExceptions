using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareExceptions.DB.Helpers
{
	public static class StringExtensions
	{
		public static string ToCamelCase(this string str)
		{
			if (!string.IsNullOrEmpty(str) && str.Length > 1)
			{
				return char.ToLowerInvariant(str[0]) + str.Substring(1);
			}
			return str;
		}

		public static string ToFirstUpper(this string str)
		{
			if (!string.IsNullOrEmpty(str) && str.Length > 1)
			{
				return char.ToUpperInvariant(str[0]) + str.Substring(1).ToLowerInvariant();
			}
			return str;
		}
	}
}
